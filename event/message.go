package event

import (
	"github.com/google/uuid"
)

type SendMessage struct {
	Event string      `json:"event"`
	Data  interface{} `json:"data"`

	TargetID uuid.UUID `json:"-"`
}

type Message struct {
	Event string `json:"event"`
	Data  []byte `json:"data"`

	SenderID uuid.UUID `json:"-"`
}