import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Connection } from 'typeorm';

import config from '../../../config/config';

import UserRepository from '../../../database/repositories/user.repository';
import User from '../../../database/entity/user.entity';

import { JwtPayload } from '../../../auth/strategies/jwt-access.strategy';

import { LoginDto } from './auth.dto';

export enum AuthServiceErrors {
  WRONG_PASSWORD = 'Wrong password',
}

@Injectable()
export default class AuthService {
  private readonly _database: Connection;
  private readonly _userRepository: UserRepository;

  private readonly _jwtService: JwtService;

  constructor(
    database: Connection,
    userRepository: UserRepository,
    jwtService: JwtService,
  ) {
    this._database = database;
    this._userRepository = userRepository;
    this._jwtService = jwtService;
  }

  private createTokens(user: User): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload: JwtPayload = {
      id: user.id,
    };

    const accessToken = this._jwtService.sign(payload, {
      secret: config.auth.jwt.access.secret,
      expiresIn: config.auth.jwt.access.lifetime,
    });

    const refreshToken = this._jwtService.sign(payload, {
      secret: config.auth.jwt.refresh.secret,
      expiresIn: config.auth.jwt.refresh.lifetime,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(data: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this._userRepository.findByEmail(data.email, {
      select: ['id', 'password'],
    });

    if (!user || !(await user.passwordCompare(data.password))) {
      throw new HttpException(
        AuthServiceErrors.WRONG_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }

    const tokens = this.createTokens(user);
    return tokens;
  }
}
