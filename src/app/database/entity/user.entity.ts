import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Entity({
  name: 'users',
})
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  private encryptPassword(): void {
    if (!this.password) {
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
  }

  async passwordCompare(pwd: string): Promise<unknown> {
    return bcrypt.compareSync(pwd, this.password.replace(/^\$2y/, '$2a'));
  }
}
