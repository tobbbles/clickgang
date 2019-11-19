import Player from "./Player";
import { EventType } from "./Type";

export class GameEvent {
    type: EventType
    
    readonly payload: object

    constructor(event: string, player?: Player, data?: object) {
        this.payload  = {
            event,
            timestamp: new Date().toISOString(),
            id: player.id,
            data: {
                ...data
            }
        };

        console.groupCollapsed(`Send: ${event}`);
        console.log(this.payload);
        console.groupEnd();
    }

    stringify(): string {
        return JSON.stringify(this.payload);
    }
}