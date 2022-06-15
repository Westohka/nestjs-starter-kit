import { Inject, Injectable } from '@nestjs/common';

import BrokerService from '../../../broker/broker.service';

@Injectable()
export default class TemplateService {
  @Inject(BrokerService)
  private readonly _broker: BrokerService;

  getHello(): string {
    return 'Hello World!';
  }

  async getHelloFromBroker(): Promise<string> {
    const data = await this._broker.getHello();
    return data;
  }
}
