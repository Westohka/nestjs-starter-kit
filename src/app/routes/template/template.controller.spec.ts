import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import BrokerModule from '../../broker/broker.module';
import BrokerService from '../../broker/broker.service';

import DatabaseModule from '../../database/database.module';
import UserRepository from '../../database/repositories/UserRepository';

import Utils from '../../utils/Utils';

import TemplateController from './template.controller';
import TemplateService from './template.service';

import { UserCreateDto } from './template.dto';

import ConsumerTemplateService from '../../queues/consumers/template/template.service';
import QueuesModule from '../../queues/queues.module';

describe('TemplateController', () => {
  let controller: TemplateController;
  let database: DatabaseModule;
  let brokerService: BrokerService;
  let userRepository: UserRepository;
  let consumer: ConsumerTemplateService;

  const jobs = {};

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        QueuesModule,
        BrokerModule,
        TypeOrmModule.forFeature([UserRepository]),
      ],
      controllers: [TemplateController],
      providers: [TemplateService],
    }).compile();

    controller = app.get<TemplateController>(TemplateController);
    database = app.get<DatabaseModule>(DatabaseModule);
    brokerService = app.get<BrokerService>(BrokerService);
    userRepository = app.get<UserRepository>(UserRepository);
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
    const connection = database.connection();
    await connection.close();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(controller.getHello()).toBe('Hello World!');
    });

    it('should return "Hello World!" from broker', async () => {
      expect(await controller.getHelloFromBroker()).toBe('Hello World!');
    });

    it('should create user', async () => {
      const payload: UserCreateDto = {
        firstname: 'firstname',
        lastname: 'lastname',
        email: `${Utils.getUUID()}@email.com`,
        password: 'password',
      };

      const user = await controller.userCreate(payload);

      expect(user.firstname).toBe(payload.firstname);
      expect(user.lastname).toBe(payload.lastname);
      expect(user.email).toBe(payload.email);
    });

    it('should get profile', async () => {
      const user = userRepository.create({
        email: `${Utils.getUUID()}@email.com`,
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname',
      });

      await userRepository.save(user);

      const response = await controller.profile({
        user,
      });

      expect(response.id).toBe(user.id);
    });

    it('should add job', async () => {
      await controller.queueTemplate();
      expect(jobs['queueTemplate']).toBe(true);
    });
  });
});
