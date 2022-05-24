import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

import {
  BrokerEvents,
  BrokerMessages,
  CLIENT_NAME,
  IEventSimpleEvent,
  IHelloMessage,
} from './broker.constants';

@Injectable()
export default class BrokerService implements OnApplicationBootstrap {
  private _client: ClientProxy;

  constructor(@Inject(CLIENT_NAME) client: ClientProxy) {
    this._client = client;
  }

  async onApplicationBootstrap() {
    await this._client.connect();
  }

  async getHello(): Promise<string> {
    const message: IHelloMessage = {
      name: 'World',
    };

    const data = await this._client.send<string>(BrokerMessages.HELLO, message);
    return firstValueFrom(data);
  }

  async publishEvent() {
    const event: IEventSimpleEvent = {
      firstname: 'firstname',
      lastname: 'lastname',
    };

    this._client.emit(BrokerEvents.EVENT_SIMPLE, event);
  }
}
