import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import rabbit from '../config/rabbit.config';

import { CLIENT_NAME } from './broker.constants';

import BrokerController from './broker.controller';
import BrokerService from './broker.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: CLIENT_NAME,
        ...rabbit,
      },
    ]),
  ],
  controllers: [BrokerController],
  providers: [BrokerService],
  exports: [BrokerService],
})
export default class BrokerModule {}
