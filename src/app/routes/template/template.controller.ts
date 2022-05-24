import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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

  @Post('queue')
  @ApiOperation({
    description: 'Add queue template',
  })
  async queueTemplate(): Promise<void> {
    await this._service.queueTemplate();
  }
}
