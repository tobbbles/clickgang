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
	dispatch  chan *event.DispatchMessage
	broadcast chan interface{}
	errors    chan error

	Players []*Player

	// Round Instance owned by the supervisor
	rimu          sync.RWMutex
	RoundInstance *Round
}

func New(dispatch chan *event.DispatchMessage, broadcast chan interface{}) (*World, error) {
	w := &World{
		dispatch:  dispatch,
		broadcast: broadcast,
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
			log.Println("not enough players to start game")
			<-time.After(1 * time.Second)
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

		// TODO: Start Round
		log.Printf("starting new round with %d players\n", len(w.Players))
		if err := round.Start(); err != nil {
			w.errors <- err
			continue
		}

		// TODO: Broadcast to all round start
		w.BroadcastRoundStart()

		// Tick through the round
		for round.Tick() {
			// TODO: Broadcast to all round tick
			w.BroadcastRoundTick(round)

			// TODO: Broadcast to next-in-queue player click request
			// TODO: See why these aren't synced with round ending

			w.DispatchClickRequest(round.Next)
			<-time.After(3 * time.Second)

			// TODO: Await response within timeout
			// TODO: IF timed out, crash the round and dispatch
			log.Printf("round tick %d/%d\n", round.TotalPlayers, round.RemainingPlayers)

			round.RemainingPlayers--
		}

		w.BroadcastRoundEnded()
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
//	Dispatch to client
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
func (w *World) BroadcastRoundStart() {
	w.broadcast <- &event.DispatchMessage{
		Event:     event.DispatchRoundStarted,
		Timestamp: time.Now(),
	}
}

func (w *World) BroadcastRoundEnded() {
	w.broadcast <- &event.DispatchMessage{
		Event:     event.DispatchRoundEnded,
		Timestamp: time.Now(),
	}
}

func (w *World) BroadcastRoundCrashed() {
	w.broadcast <- &event.DispatchMessage{
		Event:     event.DispatchRoundCrashed,
		Timestamp: time.Now(),
	}
}

func (w *World) BroadcastRoundTick(r *Round) {
	w.broadcast <- &event.DispatchMessage{
		Event: event.DispatchRoundTick,
		Data: &event.RoundTick{
			TotalPlayers:     r.TotalPlayers,
			RemainingPlayers: r.RemainingPlayers,
		},
		Timestamp: time.Now(),
	}
}
