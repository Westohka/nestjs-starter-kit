import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';

@Injectable()
export default class SeparateTemplateService {
  private readonly _queue: Queue;

  constructor(@InjectQueue('SeparateProcessor') queue: Queue) {
    this._queue = queue;
  }

  async separateProcessorTemplate(worker = 0): Promise<void> {
    await this._queue.add({
      worker,
    });
  }
}
