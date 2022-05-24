import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

@Injectable()
export default class BrokerService implements OnApplicationBootstrap {
  private _client: ClientProxy;

  constructor(@Inject('BASIC_SERVICE') client: ClientProxy) {
    this._client = client;
  }

  async onApplicationBootstrap() {
    await this._client.connect();
  }

  async getHello(): Promise<string> {
    const data = await this._client.send<string>({ cmd: 'greeting' }, 'World');
    return firstValueFrom(data);
  }

  async publishEvent() {
    this._client.emit('book-created', {
      bookName: 'The Way Of Kings',
      author: 'Brandon Sanderson',
    });
  }
}
