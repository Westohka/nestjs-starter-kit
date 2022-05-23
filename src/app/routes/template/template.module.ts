import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import JwtAccessStrategy from '../../auth/strategies/jwt-access.strategy';

import UserRepository from '../../database/repositories/UserRepository';

import TemplateController from './template.controller';
import TemplateService from './template.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [TemplateController],
  providers: [TemplateService, JwtAccessStrategy],
})
export default class TemplateModule {}
