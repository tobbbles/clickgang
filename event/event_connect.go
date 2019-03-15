package event

import "github.com/google/uuid"

type Connection struct{}

type ConnectionResponse struct {
	ID uuid.UUID `json:"id"`
}

func (c *Connection) Type() Type {
	return Connect
}
