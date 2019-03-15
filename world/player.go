package world

import (
	"github.com/google/uuid"
	"time"
)

// PlayerStatus represents the current status of player, used to query who's waiting for next round
type PlayerStatus = string

var (
	LobbyStatus PlayerStatus = "lobby"
	RoundStatus PlayerStatus = "round"
)

// Player represents every connection that has issued a connect event and been given an ID
type Player struct {

	ID       uuid.UUID
	Status   PlayerStatus
	LastSeen time.Time

	MarkedForRemoval bool
}

// NewPlayer creates a player struct from the ID
func NewPlayer(id uuid.UUID) *Player {
	p := &Player{
		ID: id,
	}

	// TODO: Implement heartbeats to players

	return p
}

// Present checks whether we've received a heartbeat back from the player
func (p *Player) Present() bool {
	return true
}
