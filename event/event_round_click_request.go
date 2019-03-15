package event

import (
	"time"
)

type ClickRequested struct {
	TotalPlayers     int       `json:"total_players"`
	RemainingPlayers int       `json:"remaining_players"`
	Timestamp        time.Time `json:"timestamp"`
}

func (c *ClickRequested) Type() Type {
	return RoundStart
}
