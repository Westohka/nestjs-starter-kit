import { Test, TestingModule } from '@nestjs/testing';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import BrokerModule from '../../broker/broker.module';
import BrokerService from '../../broker/broker.service';

import DatabaseModule from '../../database/database.module';
import UserRepository from '../../database/repositories/UserRepository';

import TemplateController from './template.controller';
import TemplateService from './template.service';

import ConsumerTemplateService from '../../queues/consumers/template/template.service';
import TemplateConsumer from '../../queues/consumers/template/template.consumer';
import SeparateTemplateService from '../../queues/consumers/separate/separate.service';

import config from '../../config/config';

describe('TemplateController', () => {
  let app: TestingModule;
  let controller: TemplateController;

  let brokerService: BrokerService;

  let consumer: ConsumerTemplateService;

  const jobs = {};

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        BrokerModule,
        TypeOrmModule.forFeature([UserRepository]),
        BullModule.forRoot({
          redis: config.redis,
          defaultJobOptions: {
            removeOnComplete: true,
            attempts: 3,
          },
          limiter: {
            max: 100,
            duration: 10000,
          },
        }),
        BullModule.registerQueue({
          name: TemplateConsumer.name,
        }),
        BullModule.registerQueue({
          name: 'SeparateProcessor',
        }),
      ],
      controllers: [TemplateController],
      providers: [
        TemplateConsumer,
        ConsumerTemplateService,
        SeparateTemplateService,
        TemplateService,
      ],
    }).compile();

    controller = app.get<TemplateController>(TemplateController);
    brokerService = app.get<BrokerService>(BrokerService);
    consumer = app.get<ConsumerTemplateService>(ConsumerTemplateService);

    jest
      .spyOn(brokerService, 'getHello')
      .mockImplementation(async (): Promise<string> => {
        return 'Hello World!';
      });

    jest
      .spyOn(consumer, 'queueTemplate')
      .mockImplementation(async (): Promise<void> => {
        jobs['queueTemplate'] = true;
      });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getHello()).toBe('Hello World!');
    });

    it('should return "Hello World!" from broker', async () => {
      expect(await controller.getHelloFromBroker()).toBe('Hello World!');
    });

    it('should add job', async () => {
      await controller.queueTemplate();
      expect(jobs['queueTemplate']).toBe(true);
    });
  });
});
