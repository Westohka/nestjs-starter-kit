import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import JwtAccessStrategy from '../../../auth/strategies/jwt-access.strategy';

import UserRepository from '../../../database/repositories/user.repository';

import UsersController from './users.controller';
import UsersService from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService, JwtAccessStrategy],
})
export default class UsersModule {}
