package server

import (
	"errors"
	"fmt"
	"log"
)

func (s *Server) Dispatcher() {
	for {
		select {
		// Dispatch message to single connection in the pool
		case msg := <-s.dispatch:
			log.Println(msg.Event)

			target, ok := s.pool[msg.Target]
			if !ok {
				s.errs <- errors.New(fmt.Sprintf("couldn't find websocket connection for target id %s", msg.Target))
				continue
			}

			if target == nil {
				s.errs <- errors.New(fmt.Sprintf("no websocket connection for target id %s", msg.Target))
				continue
			}

			if err := target.WriteJSON(msg); err != nil {
				s.errs <- err
				continue
			}

		// Broadcast msg to all connections in pool
		case msg := <-s.broadcast:
			for id, target := range s.pool {
				log.Printf("broadcasting %s message to %s", msg.Event, id)

				if err := target.WriteJSON(msg); err != nil {
					s.errs <- err
					continue
				}
			}
		}
	}
}
