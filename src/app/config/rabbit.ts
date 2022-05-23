import { RmqOptions, Transport } from '@nestjs/microservices';
import config from './config';

export default {
  transport: Transport.RMQ,
  options: {
    urls: [config.rabbit.url],
    noAck: false,
    queue: config.rabbit.queue,
    queueOptions: {
      durable: false,
    },
  },
} as RmqOptions;
