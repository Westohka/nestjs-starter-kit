import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';

import TemplateConsumer from './template.consumer';

@Injectable()
export default class ConsumerTemplateService {
  private readonly _queue: Queue;

  constructor(@InjectQueue(TemplateConsumer.name) queue: Queue) {
    this._queue = queue;
  }

  async queueTemplate(worker = 0): Promise<void> {
    await this._queue.add(TemplateConsumer.prototype.template.name, {
      worker,
    });
  }
}
