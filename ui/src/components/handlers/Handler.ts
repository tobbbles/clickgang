import { EventType } from "../Type";
import { IMessage, Data } from "../Message";

export interface Handler {
    readonly event: EventType;

    handle(message: IMessage<Data>): any;
}
