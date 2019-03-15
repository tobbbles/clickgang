package event

import (
	"encoding/json"
	"github.com/google/uuid"
)

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
