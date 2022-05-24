import { Module } from '@nestjs/common';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';
import TemplateModule from './template/template.module';
import JobsModule from './jobs/jobs.module';

@Module({
  imports: [AuthModule, UsersModule, TemplateModule, JobsModule],
})
export default class RoutesModule {}
