import { Job, DoneCallback } from 'bull';

import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserRepository from '../../database/repositories/user.repository';

import DatabaseModule from '../../database/database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserRepository])],
})
class AppContextModule {}

class SeparateProcessor {
  async start(job: Job, cb: DoneCallback): Promise<void> {
    console.log(`[${process.pid}] ${JSON.stringify(job.data)}`);

    const app = await NestFactory.createApplicationContext(AppContextModule, {
      logger: false,
    });

    const repository = app.get<UserRepository>(UserRepository);

    const users = await repository.findAndCount({
      take: 10,
    });

    console.log('users', users);

    cb(null, null);
  }
}

export default function (job: Job, cb: DoneCallback) {
  const processor = new SeparateProcessor();
  processor.start(job, cb);
}
