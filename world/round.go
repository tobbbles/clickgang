package world

import (
	"github.com/google/uuid"
	"math/rand"
	"time"
)

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
	if err := r.ShuffleOrder(); err != nil {
		return err
	}

	return nil
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

	// TODO: Dispatch Click request
	// TODO: Await timeout
	i := r.TotalPlayers - r.RemainingPlayers

	// Calculate next player
	r.Next = r.Order[i]

	return true
}

func (r *Round) Sweep() {
	for _, player := range r.Players {
		if player.MarkedForRemoval {
			r.removePlayer(player)
		}
	}
}

func (r *Round) removePlayer(p *Player) {
	//if p.
}
