package event

type DispatchRoundStart struct {
	RoundCount       int `json:"round_count"`
	TotalPlayers     int `json:"total_players"`
	RemainingPlayers int `json:"remaining_players"`
}
