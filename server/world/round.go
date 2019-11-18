package world

import (
	"math/rand"
	"time"

	"github.com/google/uuid"
)

const Duration = 10 * time.Second

type Round struct {
	TotalPlayers     int
	RemainingPlayers int

	// Players are all of the player IDs partaking in the round
	Players []*Player

	// Order of the players this round
	Order []uuid.UUID

	// Next ID of the player who's turn we're waiting on
	Next uuid.UUID

	// What time the round was created
	CreatedAt time.Time
}

// TODO: Start marks all players within r.Players to be RoundStatus
func (r *Round) Start() error {
	// Mark all the players within the round at start-time as in round
	for _, player := range r.Players {
		player.Status = RoundStatus
	}

	// Shuffle the round order
	return r.ShuffleOrder()
}

func (r *Round) ShuffleOrder() error {
	r.Order = make([]uuid.UUID, len(r.Players))

	for i, player := range r.Players {
		r.Order[i] = player.ID
	}

	// Create our order from the players
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(r.Order), func(i, j int) { r.Order[i], r.Order[j] = r.Order[j], r.Order[i] })

	return nil
}

// Tick runs a tick within the round
func (r *Round) Tick() bool {
	if r.RemainingPlayers == 0 {
		return false
	}

	// Calculate next player
	i := r.TotalPlayers - r.RemainingPlayers
	r.Next = r.Order[i]

	return true
}

// Fulfilled blocks for the duration of Duration, returning false the player didn't fire a click response in time
func (r *Round) Fulfilled(cr <-chan uuid.UUID) bool {
	t := time.NewTimer(Duration)

	select {
	case <-t.C:
		return false
	case <-cr:
		return true
	}
}

// Sweep cleans out players who have been marked for removal from the round
func (r *Round) Sweep() {
	for _, player := range r.Players {
		if player.MarkedForRemoval {
			// TODO: Remove the player from the round and ensure it's gracefully handled
		}
	}
}
