import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import AuthService from './auth.service';

import { LoginDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
  private readonly _service: AuthService;

  constructor(service: AuthService) {
    this._service = service;
  }

  @Post('sign_in')
  @ApiOperation({
    description: 'Login',
  })
  async login(@Body() user: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const data = await this._service.login(user);
    return data;
  }
}
