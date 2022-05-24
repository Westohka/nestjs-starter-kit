import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { Job } from 'bull';

@Processor('TemplateJobConsumer')
export default class TemplateJobConsumer {
  private readonly logger = new Logger(`JOB_${TemplateJobConsumer.name}`);

  @OnQueueActive()
  onActive() {
    this.logger.log('Start');
  }

  @OnQueueCompleted()
  onCompleted() {
    this.logger.log('Completed');
  }

  @OnQueueFailed()
  onFailed() {
    this.logger.error('Failed');
  }

  @Process({
    name: 'template',
    concurrency: 10,
  })
  async template(job: Job) {
    const { worker } = job.data;

    console.log('worker', worker, process.pid);
    await job.progress(100);
  }
}
