package server

import (
	"clickgang/server/event"
	"encoding/json"
	"github.com/google/uuid"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:    4096,
	WriteBufferSize:   4096,
	EnableCompression: true,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type CloseResponse struct {
	Error string `json:"error"`
}

func (s *Server) Upgrade() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println(err)
			return
		}

		// map id to conn

		// Start handler to read receive and push into pool queue
		go s.handle(conn)
	}
}

func (s *Server) handle(ws *websocket.Conn) {
	for {
		_, buf, err := ws.ReadMessage()
		if err != nil {
			s.errors <- err
			continue
		}

		log.Println(string(buf))
		message := &event.ReceiveMessage{}
		if err := json.Unmarshal(buf, message); err != nil {
			s.errors <- err
			continue
		}

		// Invalid event
		if message.Event != event.ReceiveConnect && message.ID == uuid.Nil {
			s.dispatch <- &event.DispatchMessage{
				Event: event.DispatchError,
				Data: event.Errored{
					Reason: "unathenticated request",
				},
			}

			continue
		}

		if message.Event == event.ReceiveConnect && message.ID == uuid.Nil {
			message.ID = uuid.New()
		}

		// Add to connection pools
		s.pmu.Lock()
		s.pool[message.ID] = ws
		s.pmu.Unlock()

		// DispatchEvent message to system
		s.receive <- message

		// TODO: Re-calculate order on user closing connection. Have grace period for a re-connetions
		ws.SetCloseHandler(func(code int, text string) error {
			s.receive <- &event.ReceiveMessage{
				Event: event.DispatchDisconnected,
				ID:    message.ID,
			}

			return nil
		})
	}
}
