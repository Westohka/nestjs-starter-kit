import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Test, TestingModule } from '@nestjs/testing';

import config from '../../config/config';

import DatabaseModule from '../../database/database.module';
import UserRepository from '../../database/repositories/user.repository';

import Utils from '../../utils/utils';

import AuthController from './auth.controller';
import AuthService from './auth.service';

import { LoginDto } from './auth.dto';

import { JwtPayload } from '../../auth/strategies/jwt-access.strategy';

describe('AuthModule', () => {
  let controller: AuthController;
  let database: DatabaseModule;

  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        JwtModule.register({
          secret: config.auth.jwt.access.secret,
          signOptions: {
            expiresIn: config.auth.jwt.access.lifetime,
          },
        }),
        TypeOrmModule.forFeature([UserRepository]),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = app.get<AuthController>(AuthController);
    database = app.get<DatabaseModule>(DatabaseModule);
    userRepository = app.get<UserRepository>(UserRepository);
    jwtService = app.get<JwtService>(JwtService);
  });

  afterEach(async () => {
    const connection = database.connection();
    await connection.close();
  });

  describe('Sign in', () => {
    it('Should login user', async () => {
      const user = userRepository.create({
        email: `${Utils.getUUID()}@email.com`,
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname',
      });

      const password = user.password;

      await userRepository.save(user);

      const payload: LoginDto = {
        email: user.email,
        password,
      };

      const response = await controller.login(payload);

      expect(typeof response.accessToken).toBe('string');
      expect(typeof response.refreshToken).toBe('string');

      const jwtPayload = <JwtPayload>jwtService.decode(response.accessToken);
      expect(jwtPayload.id).toBe(user.id);
    });
  });
});
