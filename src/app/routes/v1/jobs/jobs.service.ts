import { Inject, Injectable } from '@nestjs/common';

import TemplateJobService from '../../../queues/template_job/template.service';
import SeparateJobService from '../../../queues/separate_job/separate.service';

@Injectable()
export default class JobsService {
  @Inject(TemplateJobService)
  private readonly _templateQueue: TemplateJobService;

  @Inject(SeparateJobService)
  private readonly _separateQueue: SeparateJobService;

  async queueTemplate(): Promise<void> {
    await this._templateQueue.queueTemplate();
  }

  async queueSeparated(): Promise<void> {
    await this._separateQueue.separateProcessorTemplate();
  }
}
