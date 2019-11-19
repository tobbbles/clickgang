import { Event as E, Type } from "./Event";
import Player from "./Player";

// Make connection with handlers and router with callback funcs
type Message<T> = {
    event: Type
    data: T
}

export default class ConnectionManager {
    readonly connection: WebSocket
    readonly handlers: Handler[]

    constructor(url: string) {
        if (!url) {
            throw new Error('missing websocket url');
        }
        this.connection = new WebSocket(url);
        

        this.connection.onerror = (ev: Event): any => {
            throw new Error(`Websocket connection error: ${ev}`);
        };

        this.connection.onmessage = (ev: MessageEvent) => {
            const rcv = <Message<object>>JSON.parse(ev.data);

            console.log(rcv);
        }
    }

    // TODO: How do we implement a request/response model with callbacks over WS?
    request(e: E, cb: Function) {
        // this.
    }

    Player(): Player {
        let ev: E = new E(Type.Connect);

        this.request(ev, null)

        return null;
    }
}

interface Handler {
    name: string

    (this: WebSocket, ev: CloseEvent): any
}

const Disconnect = function (this: WebSocket, ev: Event): any {
    // this.send()
}