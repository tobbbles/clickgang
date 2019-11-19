import { EventType } from "./Type";

export interface Data {}

export interface IMessage<T> {
    event: EventType;
    data: T | {};
}

export type ConnectMessage = IMessage<Connect>
export type DisconnectMessage = IMessage<Disconnect>
export type RoundStartedMessage = IMessage<RoundStarted>
export type RoundEndedMessage = IMessage<RoundEnded>
export type RoundCrashedMessage = IMessage<RoundCrashed>
export type RoundTickMessage = IMessage<RoundTick>
export type ClickRequestedMessage = IMessage<ClickRequested>


export type Connect = {
    id: Number
}

export type Disconnect = {
    timestamp: Date
}

export type RoundStarted = {
    timestamp: Date
}

// {"event": "round_ended", "data": {"timestamp": "..."}}
export type RoundEnded = {
    timestamp: Date
    round_count: Number
}

export type RoundCrashed = {
    timestamp: Date
    total_players: Number
    remaining_players: Number
}

//{"event": "round_tick", "data": {"total_players": 60, "remaining_players": 35, "timestamp":"..."}}
export type RoundTick = {
    timestamp: Date
    total_players: Number
    remaining_players: Number
}

export type ClickRequested = {
    timestamp: Date
}