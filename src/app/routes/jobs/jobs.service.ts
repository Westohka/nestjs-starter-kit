import { Injectable } from '@nestjs/common';

import TemplateJobService from '../../queues/template_job/template.service';
import SeparateJobService from '../../queues/separate_job/separate.service';

@Injectable()
export default class JobsService {
  private readonly _templateQueue: TemplateJobService;
  private readonly _separateQueue: SeparateJobService;

  constructor(
    templateQueue: TemplateJobService,
    separateQueue: SeparateJobService,
  ) {
    this._templateQueue = templateQueue;
    this._separateQueue = separateQueue;
  }

  async queueTemplate(): Promise<void> {
    await this._templateQueue.queueTemplate();
  }

  async queueSeparated(): Promise<void> {
    await this._separateQueue.separateProcessorTemplate();
  }
}
