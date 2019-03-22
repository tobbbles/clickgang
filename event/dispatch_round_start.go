package event

type DispatchRoundStart struct {
	TotalPlayers     int `json:"total_players"`
	RemainingPlayers int `json:"remaining_players"`
}
