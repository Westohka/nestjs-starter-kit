import { Injectable } from '@nestjs/common';

import { Connection } from 'typeorm';

import BrokerService from '../../broker/broker.service';

import UserRepository from '../../database/repositories/UserRepository';
import User from '../../database/entity/User';

import { UserCreateDto } from './template.dto';

import ConsumerTemplateService from '../../queues/consumers/template/template.service';

@Injectable()
export default class TemplateService {
  private readonly _database: Connection;
  private readonly _userRepository: UserRepository;

  private readonly _broker: BrokerService;

  private readonly _templateQueue: ConsumerTemplateService;

  constructor(
    database: Connection,
    userRepository: UserRepository,
    broker: BrokerService,
    templateConsumer: ConsumerTemplateService,
  ) {
    this._database = database;
    this._userRepository = userRepository;

    this._broker = broker;

    this._templateQueue = templateConsumer;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getHelloFromBroker(): Promise<string> {
    const data = await this._broker.getHello();
    return data;
  }

  async userCreate(data: UserCreateDto): Promise<User> {
    const user = this._userRepository.create({
      ...data,
    });

    await this._userRepository.save(user);
    return user;
  }

  async profile(id: string): Promise<User> {
    const user = await this._userRepository.findOne(id);
    return user;
  }

  async queueTemplate(): Promise<void> {
    await this._templateQueue.queueTemplate();
  }
}
