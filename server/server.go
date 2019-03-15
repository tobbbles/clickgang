package server

import (
	"clickgang/event"
	"clickgang/world"
	"errors"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sync"
)

type Server struct {
	*http.Server
	TemplatePath string
	r            *mux.Router

	pmu  sync.RWMutex
	pool map[uuid.UUID]*websocket.Conn

	errs      chan error
	receive   chan *event.Message
	dispatch  chan *event.DispatchMessage
	broadcast chan interface{}
}

func (s *Server) Start() error {
	return s.ListenAndServe()
}

//func (s *Server) Receive() {
//	for {
//		select {
//		case msg := <-s.receive:
//			switch msg.Event {
//			case event.Connect:
//				// Create player and mark receive state
//				if err := s.state.AddPlayer(msg.SenderID); err != nil {
//					s.errs <- err
//					continue
//				}
//
//				log.Printf("Added player (id: %s) to the world\n", msg.SenderID)
//
//				// write back id to the player
//				if err := s.SendTo(msg.SenderID, &event.SendMessage{
//					Event: "connect",
//					Data: &event.ConnectionResponse{
//						ID: msg.SenderID,
//					},
//				}); err != nil {
//					s.errs <- err
//				}
//
//			case event.Disconnect:
//				// Remove from connection pool
//				s.pmu.Lock()
//				delete(s.pool, msg.SenderID)
//				s.pmu.Unlock()
//
//				// remove player from world state
//				if err := s.state.RemovePlayer(msg.SenderID); err != nil {
//					s.errs <- err
//					continue
//				}
//
//				log.Println("Removed player from world")
//
//			case event.ClickResponse:
//				e := &event.ClickResponded{}
//				if err := json.Unmarshal(msg.Data, e); err != nil {
//					s.errs <- err
//					continue
//				}
//
//				if !s.state.Playing() {
//					if err := s.SendTo(msg.SenderID, &event.SendMessage{
//						Event: event.Error,
//						Data: &event.Errored{
//							Reason: "no game is running",
//						},
//					}); err != nil {
//						s.errs <- err
//					}
//					continue
//				}
//
//				s.state.GameClick(msg.SenderID)
//			}
//		}
//	}
//}

func (s *Server) Errors() {
	select {
	case err := <-s.errs:
		log.Println(err)
	}
}

func New(addr string) (*Server, error) {
	if len(addr) == 0 {
		return nil, errors.New("invalid address given whilst initialising server")
	}

	// Setup Server
	s := &Server{
		Server: &http.Server{
			Addr: addr,
		},
		TemplatePath: "static",
		r:            mux.NewRouter(),

		pmu:  sync.RWMutex{},
		pool: make(map[uuid.UUID]*websocket.Conn),

		errs:      make(chan error),
		receive:   make(chan *event.Message, 200),
		dispatch:  make(chan *event.DispatchMessage, 200),
		broadcast: make(chan interface{}, 400),
	}

	// Route handlers
	s.r.Handle("/game", s.Upgrade())
	s.Handler = s.r

	wrld, err := world.New(s.dispatch, s.broadcast)
	if err != nil {
		return nil, err
	}

	go s.Dispatcher()
	go s.Receiver(wrld)

	go s.Errors()

	return s, nil
}
