package event

import (
	"time"
)

type RoundStarting struct {
	Timestamp time.Time `json:"timestamp"`
}

func (c *RoundStarting) Type() Type {
	return RoundStart
}
