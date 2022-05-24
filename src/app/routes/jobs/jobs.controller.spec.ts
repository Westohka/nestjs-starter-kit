import { Test, TestingModule } from '@nestjs/testing';
import { BullModule } from '@nestjs/bull';

import JobsController from './jobs.controller';
import JobsService from './jobs.service';

import TemplateJobService from '../../queues/template_job/template.service';
import TemplateJobConsumer from '../../queues/template_job/template.consumer';

import SeparateJobService from '../../queues/separate_job/separate.service';

import config from '../../config/config';

describe('JobsController', () => {
  let app: TestingModule;
  let controller: JobsController;

  let jobService: TemplateJobService;

  let queueTemplate: jest.SpyInstance;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        BullModule.forRoot({
          redis: config.redis,
          defaultJobOptions: {
            removeOnComplete: true,
            attempts: 3,
          },
          limiter: {
            max: 100,
            duration: 10000,
          },
        }),
        BullModule.registerQueue({
          name: TemplateJobConsumer.name,
        }),
        // BullModule.registerQueue({
        //   name: 'SeparateProcessor',
        // }),
      ],
      controllers: [JobsController],
      providers: [
        TemplateJobConsumer,
        TemplateJobService,
        // SeparateTemplateService,
        JobsService,
      ],
    }).compile();

    controller = app.get<JobsController>(JobsController);
    jobService = app.get<TemplateJobService>(TemplateJobService);

    queueTemplate = jest
      .spyOn(jobService, 'queueTemplate')
      .mockImplementation(async (): Promise<void> => {
        return;
      });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should add job', async () => {
      await controller.queueTemplate();
      expect(queueTemplate).toBeCalledTimes(1);
    });
  });
});
