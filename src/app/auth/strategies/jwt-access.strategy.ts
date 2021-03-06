import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '../../config/config';
import UserRepository from '../../database/repositories/user.repository';

export interface JwtPayload {
  id: string;
}

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  @Inject(UserRepository)
  private _userRepository: UserRepository;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.auth.jwt.access.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this._userRepository.findOne(payload.id);
    return user;
  }
}
