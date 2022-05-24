import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';

import User from './entity/user.entity';

import config from '../config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      entities: [User],
      synchronize: false,
    }),
  ],
})
export default class DatabaseModule {
  private readonly _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  connection(): Connection {
    return this._connection;
  }
}
