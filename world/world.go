package world

import (
	"clickgang/event"
	"github.com/google/uuid"
	"log"
	"sync"
	"time"
)

// World oversees all game-based operations
type World struct {
	ClickResponder chan uuid.UUID
	dispatch       chan *event.DispatchMessage
	broadcast      chan *event.BroadcastMessage
	errors         chan error

	Players    []*Player
	RoundCount int

	rimu sync.RWMutex
	// RoundInstance owned by the supervisor
	RoundInstance *Round
}

func New(dispatch chan *event.DispatchMessage, broadcast chan *event.BroadcastMessage) (*World, error) {
	w := &World{
		ClickResponder: make(chan uuid.UUID),
		errors:         make(chan error, 10),
		dispatch:       dispatch,
		broadcast:      broadcast,
	}

	go w.Error()
	go w.Supervisor()

	return w, nil
}

func (w *World) Error() {
	for {
		select {
		case err := <-w.errors:
			log.Println(err)

			w.dispatch <- &event.DispatchMessage{
				Event: event.DispatchError,
				Data: event.Errored{
					Reason: err.Error(),
				},
			}
		}
	}
}

// Supervisor oversees all operations in the world and is responsible for:
// - Running rounds
// - Registering players for rounds
// - Dispatching click events to players
// - Crashing rounds
// - Handling player time-outs resulting in crashed rounds
func (w *World) Supervisor() {
	log.Println("starting supervisor")

	for {
		// Await for two players to start a round
		if len(w.Players) < 2 {
			<-time.After(5 * time.Second)
			continue
		}

		// Take our lobbied players and put them into the round, resetting the lobby
		// TODO: Validate how we move players from the round back into the lobby, and whether we should just have a player
		// 		 type that marks people lobbied/in-round

		// Create round from players in the lobby
		round, err := w.NewRound(w.Players)
		if err != nil {
			w.errors <- err
			continue
		}

		log.Printf("starting new round with %d players\n", len(w.Players))
		if err := round.Start(); err != nil {
			w.errors <- err
			continue
		}

		// Broadcast to all round start
		w.BroadcastRoundStart(round)

		// Tick through the round
		for round.Tick() {
			// Broadcast to all round tick
			w.BroadcastRoundTick(round)

			// Broadcast to next-in-queue player click request
			w.DispatchClickRequest(round.Next)

			// Block for a timeout duration, returning whether the click request was fulfilled
			if !round.Fulfilled(w.ClickResponder) {
				w.BroadcastRoundCrashed(round)
				break
			}

			log.Printf("round tick %d/%d\n", round.TotalPlayers, round.RemainingPlayers)

			round.RemainingPlayers--
		}

		w.BroadcastRoundEnded(round)

		// Wait before starting a new round
		<-time.After(10 * time.Second)
	}
}

// NewRounds creates a new round
func (w *World) NewRound(players []*Player) (*Round, error) {
	r := &Round{
		TotalPlayers:     len(players),
		RemainingPlayers: len(players),
		Players:          players,
		CreatedAt:        time.Now(),
	}

	w.RoundCount++

	return r, nil
}

// AddPlayer marks a player as in-lobby and adds them to the world
func (w *World) AddPlayer(p *Player) error {
	// Mark player in lobby state
	p.Status = LobbyStatus
	w.Players = append(w.Players, p)

	return nil
}

// Remove will remove a lobbied player without questions, otherwise will re-adjust a round to account for the player
// removal
func (w *World) RemovePlayer(id uuid.UUID) error {
	for _, player := range w.Players {
		if player.ID == id {
			if player.Status == RoundStatus {

			}

		}
	}
	return nil
}

//
//	DispatchEvent to client
//
func (w *World) DispatchClickRequest(id uuid.UUID) {
	w.dispatch <- &event.DispatchMessage{
		Target:    id,
		Event:     event.DispatchClickRequested,
		Data:      "dispatched",
		Timestamp: time.Now(),
	}
}

//
//	Common Broadcasts
//
func (w *World) BroadcastRoundStart(r *Round) {
	w.broadcast <- &event.BroadcastMessage{
		Event: event.DispatchRoundStarted,
		Data: event.DispatchRoundStart{
			RoundCount:       w.RoundCount,
			TotalPlayers:     r.TotalPlayers,
			RemainingPlayers: r.RemainingPlayers,
		},
		Timestamp: time.Now(),
	}
}

func (w *World) BroadcastRoundEnded(r *Round) {
	w.broadcast <- &event.BroadcastMessage{
		Event: event.DispatchRoundEnded,
		Data: event.DispatchRoundEnd{
			TotalPlayers:     r.TotalPlayers,
			RemainingPlayers: r.RemainingPlayers,
		},
		Timestamp: time.Now(),
	}
}

func (w *World) BroadcastRoundCrashed(r *Round) {
	w.broadcast <- &event.BroadcastMessage{
		Event: event.DispatchRoundCrashed,
		Data: event.DispatchRoundCrash{
			TotalPlayers:     r.TotalPlayers,
			RemainingPlayers: r.RemainingPlayers,
		},
		Timestamp: time.Now(),
	}
}

func (w *World) BroadcastRoundTick(r *Round) {
	w.broadcast <- &event.BroadcastMessage{
		Event: event.DispatchRoundTick,
		Data: &event.RoundTick{
			TotalPlayers:     r.TotalPlayers,
			RemainingPlayers: r.RemainingPlayers,
		},
		Timestamp: time.Now(),
	}
}
