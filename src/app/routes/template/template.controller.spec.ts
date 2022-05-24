import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import BrokerModule from '../../broker/broker.module';
import BrokerService from '../../broker/broker.service';

import DatabaseModule from '../../database/database.module';
import UserRepository from '../../database/repositories/UserRepository';

import TemplateController from './template.controller';
import TemplateService from './template.service';

describe('TemplateController', () => {
  let app: TestingModule;
  let controller: TemplateController;

  let brokerService: BrokerService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        BrokerModule,
        TypeOrmModule.forFeature([UserRepository]),
      ],
      controllers: [TemplateController],
      providers: [TemplateService],
    }).compile();

    controller = app.get<TemplateController>(TemplateController);
    brokerService = app.get<BrokerService>(BrokerService);

    jest
      .spyOn(brokerService, 'getHello')
      .mockImplementation(async (): Promise<string> => {
        return 'Hello World!';
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
  });
});
