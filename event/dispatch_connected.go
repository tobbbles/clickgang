package event

import "github.com/google/uuid"

type Connected struct {
	ID uuid.UUID `json:"id"`
}
