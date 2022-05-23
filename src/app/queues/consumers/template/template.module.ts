import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

import TemplateConsumer from './template.consumer';
import ConsumerTemplateService from './template.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: TemplateConsumer.name,
    }),
  ],
  providers: [TemplateConsumer, ConsumerTemplateService],
  exports: [ConsumerTemplateService],
})
export default class ConsumerTemplateModule {}
