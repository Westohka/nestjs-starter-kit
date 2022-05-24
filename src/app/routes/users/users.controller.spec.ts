import { Test, TestingModule } from '@nestjs/testing';

import { TypeOrmModule } from '@nestjs/typeorm';

import DatabaseModule from '../../database/database.module';
import UserRepository from '../../database/repositories/UserRepository';

import Utils from '../../utils/Utils';

import { UserCreateDto } from './users.dto';

import UsersController from './users.controller';
import UsersService from './users.service';

describe('UsersController', () => {
  let app: TestingModule;
  let controller: UsersController;

  let repository: UserRepository;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([UserRepository])],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = app.get<UsersController>(UsersController);
    repository = app.get<UserRepository>(UserRepository);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('root', () => {
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
      const user = repository.create({
        email: `${Utils.getUUID()}@email.com`,
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname',
      });

      await repository.save(user);

      const response = await controller.profile({
        user,
      });

      expect(response.id).toBe(user.id);
    });
  });
});
