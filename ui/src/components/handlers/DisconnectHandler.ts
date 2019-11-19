import { EventType } from "../Type"
import { IMessage, ConnectMessage } from "../Message"
import { Handler } from "./Handler"

export default class DisconnectHandler implements Handler {
    event: EventType = EventType.Disconnect
    
    constructor(){}

    handle(message: IMessage<ConnectMessage>): any {
        console.log(message.event)
        console.log(message.data)
    }
}