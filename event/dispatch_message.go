package event

import (
	"github.com/google/uuid"
	"time"
)

type DispatchMessage struct {
	Target uuid.UUID `json:"-"`

	Event     Dispatch    `json:"event"`
	Data      interface{} `json:"data"`
	Timestamp time.Time   `json:"timestamp"`
}
