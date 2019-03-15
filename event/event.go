package event

type Dispatch = string

type Receive = string

type Type = string

//
const (
	// Receivers
	ReceiveConnect       Receive = "connect"
	ReceiveClickResponse Receive = "click_response"

	// Dispatchers
	DispatchConnected      Dispatch = "connected"
	DispatchDisconnected   Dispatch = "disconnected"
	DispatchRoundStarted   Dispatch = "round_started"
	DispatchRoundTick      Dispatch = "round_tick"
	DispatchRoundCrashed   Dispatch = "round_crashed"
	DispatchRoundEnded     Dispatch = "round_ended"
	DispatchClickRequested Dispatch = "click_requested"
	DispatchError          Dispatch = "error"

	Error Type = "error"

	// DEPRECATED: Uses dispatch and receive
	Connect        Type = "connect"
	Disconnect     Type = "disconnect"
	RoundStart     Type = "round_start"
	RoundEnd       Type = "round_end"
	RoundCrash     Type = "round_crash"
	RoundIncrement Type = "round_increment"
	ClickRequest   Type = "click_request"
	ClickResponse  Type = "click_response"
)

type Event interface {
	Type() Type
}

type Dispatcher interface {
	Dispatch(Type) error
}
