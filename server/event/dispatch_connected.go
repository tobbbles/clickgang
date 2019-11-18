package event

import "github.com/google/uuid"

type Connected struct {
	ID uuid.UUID `json:"id"`

	TotalPlayers     int `json:"total_players"`
	RemainingPlayers int `json:"remaining_players"`
}
