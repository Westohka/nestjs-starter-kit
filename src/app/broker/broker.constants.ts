export const CLIENT_NAME = 'SERVICE_TEMPLATE';

export enum BrokerMessages {
  HELLO = 'hello',
}

export interface IHelloMessage {
  name: string;
}

export enum BrokerEvents {
  EVENT_SIMPLE = 'event_simple',
}

export interface IEventSimpleEvent {
  firstname: string;
  lastname: string;
}
