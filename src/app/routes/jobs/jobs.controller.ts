import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import JobsService from './jobs.service';

@ApiTags('jobs')
@Controller('jobs')
export default class JobsController {
  private readonly _service: JobsService;

  constructor(service: JobsService) {
    this._service = service;
  }

  @Post('queue')
  @ApiOperation({
    description: 'Add queue template',
  })
  async queueTemplate(): Promise<void> {
    await this._service.queueTemplate();
  }
}
