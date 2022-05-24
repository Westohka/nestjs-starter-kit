import { Injectable } from '@nestjs/common';

import { Connection } from 'typeorm';

import BrokerService from '../../broker/broker.service';

import ConsumerTemplateService from '../../queues/consumers/template/template.service';

@Injectable()
export default class TemplateService {
  private readonly _database: Connection;

  private readonly _broker: BrokerService;

  private readonly _templateQueue: ConsumerTemplateService;

  constructor(
    database: Connection,
    broker: BrokerService,
    templateConsumer: ConsumerTemplateService,
  ) {
    this._database = database;

    this._broker = broker;

    this._templateQueue = templateConsumer;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getHelloFromBroker(): Promise<string> {
    const data = await this._broker.getHello();
    return data;
  }

  async queueTemplate(): Promise<void> {
    await this._templateQueue.queueTemplate();
  }
}
