package server

import (
	"clickgang/event"
	"clickgang/world"
	"log"
)

func (s *Server) Receiver(w *world.World) {
	for {
		select {
		case msg := <-s.receive:
			switch msg.Event {
			case event.ReceiveConnect:
				p := world.NewPlayer(msg.SenderID)
				if err := w.AddPlayer(p); err != nil {
					s.errs <- err
					continue
				}

				log.Println("added player to world %s", p.ID)

			case event.ReceiveClickResponse:
				// TODO: Publish to game state
			}
		}
	}
}
