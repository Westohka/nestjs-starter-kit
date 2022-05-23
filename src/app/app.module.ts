import { Module } from '@nestjs/common';

import DatabaseModule from './database/database.module';
import BrokerModule from './broker/broker.module';
import QueuesModule from './queues/queues.module';
import RoutesModule from './routes/routes.module';

@Module({
  imports: [DatabaseModule, BrokerModule, QueuesModule, RoutesModule],
})
export class AppModule {}
