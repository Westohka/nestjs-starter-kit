import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import rabbit from '../config/rabbit';

import BrokerController from './broker.controller';
import BrokerService from './broker.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BASIC_SERVICE',
        ...rabbit,
      },
    ]),
  ],
  controllers: [BrokerController],
  providers: [BrokerService],
  exports: [BrokerService],
})
export default class BrokerModule {}
