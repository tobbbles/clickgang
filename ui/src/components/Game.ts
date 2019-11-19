import State from "./State"
import ConnectionManager from "./ConnectionManager";
import { ConnectHandler, DisconnectHandler } from "./handlers/All";

export default class Game {
    cm: ConnectionManager
    state: State

    constructor() {
        this.state = new State();
        
        window.addEventListener('beforeunload', () => {
            let player = this.state.player;

            if (player && this.cm.connection) {
                // let e: Event = new Event(Type.Disconnect, player)
            }
        });
    }

    connect() {
       this.cm = new ConnectionManager('ws://localhost:3117/game');
       this.router();
    }

    router() {
        this.cm.handle(new ConnectHandler())
        this.cm.handle(new DisconnectHandler())
    }
    //
    //      Connection Handlers
    //

    DisconnectHandler(serverTriggered: boolean) {
        if (serverTriggered) {
            console.log('server triggered disconnect');
        } else {
            console.log('disconnect');
        }
    }
}

