import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import BrokerService from '../../broker/broker.service';

@Injectable()
export default class TemplateService {
  private readonly _database: Connection;
  private readonly _broker: BrokerService;

  constructor(database: Connection, broker: BrokerService) {
    this._database = database;
    this._broker = broker;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getHelloFromBroker(): Promise<string> {
    const data = await this._broker.getHello();
    return data;
  }
}
