import { GameEvent } from "./GameEvent";
import { EventType } from "./Type";
import Player from "./Player";
import { IMessage, ConnectMessage } from "./Message";
import { Handler } from "./handlers/Handler";

export default class ConnectionManager {
    readonly connection: WebSocket
    readonly handlers: Handler[]

    constructor(url: string) {
        if (!url) {
            throw new Error('missing websocket url');
        }

        this.handlers = [];
        this.connection = new WebSocket(url);

        this.connection.onerror = (ev: Event): any => {
            throw new Error(`Websocket connection error: ${ev}`);
        };

        this.connection.onmessage = (ev: MessageEvent) => {
            const rcv = JSON.parse(ev.data);
            
            let handler = this.handlers.find((h) => h.event == rcv.event)
            handler.handle(rcv)
        }
    }

    handle(handler: Handler) {
        this.handlers.push(handler)
    }

    // send(ev: EventType, msg: Message): null {

    // }
}