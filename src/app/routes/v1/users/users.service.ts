import { Inject, Injectable } from '@nestjs/common';

import UserRepository from '../../../database/repositories/user.repository';
import User from '../../../database/entity/user.entity';

import { UserCreateDto } from './users.dto';

@Injectable()
export default class UsersService {
  @Inject(UserRepository)
  private readonly _repository: UserRepository;

  async create(data: UserCreateDto): Promise<User> {
    const user = this._repository.create({
      ...data,
    });

    await this._repository.save(user);
    return user;
  }

  async profile(id: string): Promise<User> {
    const user = await this._repository.findOne(id);
    return user;
  }
}
