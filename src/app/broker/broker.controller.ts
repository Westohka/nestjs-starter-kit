import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import {
  BrokerEvents,
  BrokerMessages,
  IHelloMessage,
} from './broker.constants';

@Controller()
export default class BrokerController {
  protected close(@Ctx() context: RmqContext): void {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
  }

  @MessagePattern(BrokerMessages.HELLO)
  getHelloMessage(data: IHelloMessage): string {
    return `Hello ${data.name}`;
  }

  @EventPattern(BrokerEvents.EVENT_SIMPLE)
  async handleEvents(
    @Payload() data: Record<string, unknown>,
    @Ctx() context: RmqContext,
  ) {
    console.log('handleEvents', data);
    this.close(context);
  }
}
