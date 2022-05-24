import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

import TemplateJobConsumer from './template.consumer';
import TemplateJobService from './template.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: TemplateJobConsumer.name,
    }),
  ],
  providers: [TemplateJobConsumer, TemplateJobService],
  exports: [TemplateJobService],
})
export default class ConsumerTemplateModule {}
