import { EventType } from "../Type"
import { IMessage, ConnectMessage } from "../Message"
import { Handler } from "./Handler"

export default class ConnectHandler implements Handler {
    readonly event: EventType = EventType.Connect
    
    constructor(){}

    handle(message: IMessage<ConnectMessage>): any {
        console.log(message.event)
        console.log(message.data)
    }
}