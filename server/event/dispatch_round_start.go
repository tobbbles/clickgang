package event

import "time"

type DispatchRoundStart struct {
	RoundCount    int           `json:"round_count"`
	RoundDuration time.Duration `json:"round_time"`

	TotalPlayers     int `json:"total_players"`
	RemainingPlayers int `json:"remaining_players"`
}
