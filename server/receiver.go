package server

import (
	"clickgang/event"
	"clickgang/world"
	"log"
	"time"
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

				log.Printf("added player to world %s", p.ID)

				s.dispatch <- &event.DispatchMessage{
					Target: p.ID,
					Event:  event.DispatchConnected,
					Data: event.Connected{
						ID: p.ID,
					},
					Timestamp: time.Now(),
				}
			case event.ReceiveClickResponse:
				log.Printf("received click response from %s", msg.SenderID)
				// Publish click response into work
				w.ClickResponder <- msg.SenderID
			}
		}
	}
}
