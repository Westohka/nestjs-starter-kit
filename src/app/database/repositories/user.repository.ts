import { EntityRepository, FindOneOptions, Repository } from 'typeorm';

import User from '../entity/user.entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async findByEmail(
    email: string,
    options?: FindOneOptions<User>,
  ): Promise<User> {
    const data = await this.findOne(
      {
        email,
      },
      options,
    );

    return data;
  }
}
