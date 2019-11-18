package event

// RoundTick is dispatched to the players when a game event happens such as a player publishes a click.
// This is used by the game to calculate the round ticker with:
// (360 - ((360 / total_players) * remaining_players))
type RoundTick struct {
	RoundCount       int `json:"round_count"`
	TotalPlayers     int `json:"total_players"`
	RemainingPlayers int `json:"remaining_players"`
}
