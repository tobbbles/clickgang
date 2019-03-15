package event

import (
	"time"
)

type RoundEnding struct{
	Timestamp time.Time `json:"timestamp"`
}

func (c *RoundEnding) Type() Type {
	return RoundEnd
}
