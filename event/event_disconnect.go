package event

type Disconnection struct{}

func (c *Disconnection) Type() Type {
	return Disconnect
}
