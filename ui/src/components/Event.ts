import Player from "./Player";

export enum Type {
    Connect = 'connect',
    Disconnect = 'disconnect'
}   

interface Props {
    onClick(w: Window, ev: MouseEvent): any
}


export class Event {
    type: Type
    
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