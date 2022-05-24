import { Injectable } from '@nestjs/common';

import TemplateJobService from '../../queues/consumers/template/template.service';

@Injectable()
export default class JobsService {
  private readonly _templateQueue: TemplateJobService;

  constructor(templateQueue: TemplateJobService) {
    this._templateQueue = templateQueue;
  }

  async queueTemplate(): Promise<void> {
    await this._templateQueue.queueTemplate();
  }
}
