package world
//
//import (
//	"github.com/google/uuid"
//	"math/rand"
//	"time"
//)
//
//type Game struct {
//	Order map[int]uuid.UUID
//
//	current int
//	total   int
//
//	NextID uuid.UUID
//
//	crash chan struct{}
//}
//
//func (s *State) Game() *Game {
//	return s.game
//}
//
//func (s *State) shuffled() map[int]uuid.UUID {
//	var (
//		shuffled = make(map[int]uuid.UUID, len(s.players))
//		players  = s.players
//	)
//
//	r := rand.New(rand.NewSource(time.Now().Unix()))
//	for i := 0; i < len(players); i++ {
//		n := len(players)
//		randIndex := r.Intn(n)
//		players[n-1], players[randIndex] = players[randIndex], players[n-1]
//
//		shuffled[i] = players[n-1]
//	}
//
//	return shuffled
//}
//
//func (s *State) StartGame() {
//	s.game = &Game{
//		Order:  make(map[int]uuid.UUID),
//		NextID: uuid.Nil,
//	}
//
//	// Shuffle the players in lobby for the game order
//	s.game.Order = s.shuffled()
//
//	// Set the next player
//	s.game.NextID = s.game.Order[0]
//	s.game.current = 1
//}
//
//func (s *State) GameClick(id uuid.UUID) {
//	if id != s.game.NextID {
//		panic("CRASHED")
//	}
//
//	// invalid/ghost click
//	if s.game.current == s.game.total {
//		return
//	}
//
//	s.game.current++
//	s.game.NextID = s.game.Order[s.game.current]
//}
