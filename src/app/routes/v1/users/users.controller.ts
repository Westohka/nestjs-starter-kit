import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAccessGuard } from '../../../auth/guards/jwt-access.guard';

import User from '../../../database/entity/user.entity';

import { UserCreateDto } from './users.dto';
import UsersService from './users.service';

@ApiTags('v1', 'users')
@Controller('v1/users')
export default class UsersController {
  @Inject(UsersService)
  private readonly _service: UsersService;

  @Post()
  @ApiOperation({
    description: 'Create user',
  })
  async userCreate(@Body() user: UserCreateDto): Promise<User> {
    const data = await this._service.create(user);
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
}
