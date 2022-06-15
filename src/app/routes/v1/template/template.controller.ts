import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import TemplateService from './template.service';

@ApiTags('v1', 'template')
@Controller('v1/template')
export default class TemplateController {
  @Inject(TemplateService)
  private readonly _service: TemplateService;

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
}
