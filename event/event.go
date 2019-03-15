package event

type (
	DispatchEvent = string
	ReceiveEvent = string
)

//
const (
	// Receivers
	ReceiveConnect       ReceiveEvent = "connect"
	ReceiveClickResponse ReceiveEvent = "click_response"

	// Dispatchers
	DispatchConnected      DispatchEvent = "connected"
	DispatchDisconnected   DispatchEvent = "disconnected"
	DispatchRoundStarted   DispatchEvent = "round_started"
	DispatchRoundTick      DispatchEvent = "round_tick"
	DispatchRoundCrashed   DispatchEvent = "round_crashed"
	DispatchRoundEnded     DispatchEvent = "round_ended"
	DispatchClickRequested DispatchEvent = "click_requested"
	DispatchError          DispatchEvent = "error"
)
