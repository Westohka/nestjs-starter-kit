import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import config from '../config/config';

import ConsumerTemplateModule from './consumers/template/template.module';
import SeparateTemplateModule from './consumers/separate/separate.module';

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
    ConsumerTemplateModule,
    SeparateTemplateModule,
  ],
})
export default class QueuesModule {}
