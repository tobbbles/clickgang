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
		case event := <-s.dispatch:
			log.Println(event.Event)

			target, ok := s.pool[event.Target]
			if !ok {
				s.errs <- errors.New(fmt.Sprintf("couldn't find websocket connection for target id %s", event.Target))
				continue
			}

			if target == nil {
				s.errs <- errors.New(fmt.Sprintf("no websocket connection for target id %s", event.Target))
				continue
			}

			if err := target.WriteJSON(event); err != nil {
				s.errs <- err
				continue
			}

			// Broadcast event to all connections in pool
		case event := <-s.broadcast:
			for id, target := range s.pool {
				log.Printf("broadcast %s", id)

				if err := target.WriteJSON(event); err != nil {
					s.errs <- err
					continue
				}
			}
		}
	}
}
