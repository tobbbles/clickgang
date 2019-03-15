package event

import (
	"encoding/json"
	"github.com/google/uuid"
	"time"
)

// DispatchMessage wraps a Data message, it's intent is to dispatch a single message, of type Eventto a single
// user (from Target
type DispatchMessage struct {
	Target uuid.UUID `json:"-"`

	Event     DispatchEvent `json:"event"`
	Data      interface{}   `json:"data"`
	Timestamp time.Time     `json:"timestamp"`
}

// BroadcastMessage will house some data of type Event to broad
type BroadcastMessage struct {
	Event     DispatchEvent `json:"event"`
	Data      interface{}   `json:"data"`
	Timestamp time.Time     `json:"timestamp"`
}

type ReceiveMessage struct {
	Event string `json:"event"`
	Data  []byte `json:"data"`

	SenderID uuid.UUID `json:"-"`
}

func (m *ReceiveMessage) UnmarshalJSON(buf []byte) error {
	type Alias ReceiveMessage
	aux := &struct {
		SenderID string `json:"id"`
		*Alias
	}{
		Alias: (*Alias)(m),
	}

	if err := json.Unmarshal(buf, aux); err != nil {
		return err
	}

	if len(aux.SenderID) != 0 {
		m.SenderID = uuid.Must(uuid.Parse(aux.SenderID))
	}

	return nil
}
