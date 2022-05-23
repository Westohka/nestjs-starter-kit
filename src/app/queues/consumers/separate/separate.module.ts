import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

import { join } from 'path';

import SeparateTemplateService from './separate.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'SeparateProcessor',
      processors: [
        {
          path: join(__dirname, 'separate.processor.js'),
          concurrency: 10,
        },
      ],
    }),
  ],
  providers: [SeparateTemplateService],
  exports: [SeparateTemplateService],
})
export default class SeparateTemplateModule {}
