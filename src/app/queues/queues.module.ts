import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import config from '../config/config';

import TemplateJobModule from './template_job/template.module';
import SeparateJobModule from './separate_job/separate.module';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: config.redis,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 3,
      },
      limiter: {
        max: 100,
        duration: 10000,
      },
    }),
    TemplateJobModule,
    SeparateJobModule,
  ],
})
export default class QueuesModule {}
