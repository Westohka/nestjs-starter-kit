import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import JobsService from './jobs.service';

@ApiTags('v1', 'jobs')
@Controller('v1/jobs')
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

  @Post('separated_queue')
  @ApiOperation({
    description: 'Add separated queue template',
  })
  async queueSeparated(): Promise<void> {
    await this._service.queueSeparated();
  }
}
