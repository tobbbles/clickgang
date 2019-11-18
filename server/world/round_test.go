package world

import (
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestRound_ShuffleOrder(t *testing.T) {
	tests := []struct {
		Name     string
		Players  []*Player
		Expected func(res []uuid.UUID)
	}{
		{
			Name: "Passing",
			Players: []*Player{
				{ID: uuid.MustParse("1b3947bb-9047-47cb-8113-547bded31f28")},
				{ID: uuid.MustParse("8ec067a2-79d5-4f9a-bf20-001777c6f688")},
				{ID: uuid.MustParse("434289c9-ac69-4844-aea0-8a0fc5ef2567")},
			},
			Expected: func(res []uuid.UUID) {
				assert.NotEqual(t, []uuid.UUID{
					uuid.MustParse("1b3947bb-9047-47cb-8113-547bded31f28"),
					uuid.MustParse("8ec067a2-79d5-4f9a-bf20-001777c6f688"),
					uuid.MustParse("434289c9-ac69-4844-aea0-8a0fc5ef2567"),
				}, res)
			},
		},
	}

	for _, test := range tests {
		t.Run(test.Name, func(tt *testing.T) {

			r := &Round{
				TotalPlayers:     len(test.Players),
				RemainingPlayers: len(test.Players),
				Players:          test.Players,
			}

			err := r.ShuffleOrder()
			assert.Nil(t, err)

			test.Expected(r.Order)
		})
	}
}
