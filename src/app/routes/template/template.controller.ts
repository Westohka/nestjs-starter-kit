import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../../auth/guards/jwt-access.guard';

import User from '../../database/entity/User';

import { UserCreateDto } from './template.dto';
import TemplateService from './template.service';

@ApiTags('template')
@Controller('template')
export default class TemplateController {
  private readonly _service: TemplateService;

  constructor(service: TemplateService) {
    this._service = service;
  }

  @Get()
  @ApiOperation({
    description: 'Get hello world',
  })
  getHello(): string {
    return this._service.getHello();
  }

  @Get('broker')
  @ApiOperation({
    description: 'Get hello world from broker',
  })
  async getHelloFromBroker(): Promise<string> {
    const data = await this._service.getHelloFromBroker();
    return data;
  }

  @Post('user')
  @ApiOperation({
    description: 'Create user',
  })
  async userCreate(@Body() user: UserCreateDto): Promise<User> {
    const data = await this._service.userCreate(user);
    return data;
  }

  @UseGuards(JwtAccessGuard)
  @Get('profile')
  @ApiOperation({
    description: 'Get profile',
  })
  @ApiBearerAuth()
  async profile(@Request() req): Promise<User> {
    const user = <User>req.user;

    const profile = await this._service.profile(user.id);
    return profile;
  }

  @Post('queue')
  @ApiOperation({
    description: 'Add queue template',
  })
  async queueTemplate(): Promise<void> {
    await this._service.queueTemplate();
  }
}
