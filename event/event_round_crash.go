package event

import (
	"time"
)

type RoundCrashed struct{
	Timestamp time.Time `json:"timestamp"`
}


func (c *RoundCrashed) Type() Type {
	return RoundStart
}
