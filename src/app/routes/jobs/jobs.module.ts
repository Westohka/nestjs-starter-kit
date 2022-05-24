import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import JwtAccessStrategy from '../../auth/strategies/jwt-access.strategy';

import UserRepository from '../../database/repositories/UserRepository';

import JobsController from './jobs.controller';
import JobsService from './jobs.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [JobsController],
  providers: [JobsService, JwtAccessStrategy],
})
export default class JobsModule {}
