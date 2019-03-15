package event

import (
	"encoding/json"
	"github.com/google/uuid"
)

type ClickResponded struct {
	ID uuid.UUID `json:"id"`
}

func (m *ClickResponded) UnmarshalJSON(buf []byte) error {
	type Alias ClickResponded
	aux := &struct {
		SenderID string `json:"id"`
		*Alias
	}{
		Alias: (*Alias)(m),
	}

	if err := json.Unmarshal(buf, aux); err != nil {
		return err
	}

	m.ID = uuid.Must(uuid.Parse(aux.SenderID))

	return nil
}

func (c *ClickResponded) Type() Type {
	return RoundStart
}
