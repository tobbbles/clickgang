package event

type DispatchRoundCrash struct {
	TotalPlayers     int `json:"total_players"`
	RemainingPlayers int `json:"remaining_players"`
}
