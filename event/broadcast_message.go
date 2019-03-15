package event

import (
	"time"
)

type BroadcastMessage struct {
	Event     Dispatch    `json:"event"`
	Data      interface{} `json:"data"`
	Timestamp time.Time   `json:"timestamp"`
}
