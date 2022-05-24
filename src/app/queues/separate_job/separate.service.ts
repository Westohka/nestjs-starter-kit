import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';

import { CLIENT_NAME } from './separate.constants';

@Injectable()
export default class SeparateJobService {
  private readonly _queue: Queue;

  constructor(@InjectQueue(CLIENT_NAME) queue: Queue) {
    this._queue = queue;
  }

  async separateProcessorTemplate(worker = 0): Promise<void> {
    await this._queue.add({
      worker,
    });
  }
}
