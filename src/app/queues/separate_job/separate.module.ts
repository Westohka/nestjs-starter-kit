import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

import { join } from 'path';

import { CLIENT_NAME } from './separate.constants';

import SeparateJobService from './separate.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: CLIENT_NAME,
      processors: [
        {
          path: join(__dirname, 'separate.processor.js'),
          concurrency: 10,
        },
      ],
    }),
  ],
  providers: [SeparateJobService],
  exports: [SeparateJobService],
})
export default class SeparateTemplateModule {}
