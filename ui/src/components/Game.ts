import State from "./State"
import {Event, Type} from "./Event"
import Player from "./Player";
import ConnectionManager from "./Connection";

export default class Game {
    connection: ConnectionManager
    state: State

    constructor() {
        this.state = new State();
        
        window.addEventListener('beforeunload', () => {
            let player = this.state.player;

            if (player && this.connection) {
                // let e: Event = new Event(Type.Disconnect, player)
            }
        });
    }

    connect() {
       this.connection = new ConnectionManager('ws://localhost:3117/game');
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