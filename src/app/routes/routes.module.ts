import { Module } from '@nestjs/common';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';
import TemplateModule from './template/template.module';

@Module({
  imports: [AuthModule, UsersModule, TemplateModule],
})
export default class RoutesModule {}
