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
	r            *mux.Router

	pmu  sync.RWMutex
	pool map[uuid.UUID]*websocket.Conn

	errors    chan error
	receive   chan *event.ReceiveMessage
	dispatch  chan *event.DispatchMessage
	broadcast chan *event.BroadcastMessage
}

func (s *Server) Start() error {
	return s.ListenAndServe()
}

func (s *Server) Errors() {
	select {
	case err := <-s.errors:
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
		r:            mux.NewRouter(),

		pmu:  sync.RWMutex{},
		pool: make(map[uuid.UUID]*websocket.Conn),

		errors:    make(chan error),
		receive:   make(chan *event.ReceiveMessage, 200),
		dispatch:  make(chan *event.DispatchMessage),
		broadcast: make(chan *event.BroadcastMessage),
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
