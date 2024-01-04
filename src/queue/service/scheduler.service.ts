// scheduler.service.ts

import { Injectable } from '@nestjs/common';
import { QueueService } from '../queue.service';
import JobTypeEnum from '../enum/jobType.enum';
import { Job, Queue } from 'kue';

@Injectable()
export class SchedulerService {
  constructor(private readonly queueService: QueueService) {}

  public scheduleJob(
    jobType: JobTypeEnum,
    jobData: Record<any, any>,
    jobDelayDate: Date | null,
    processCallback: (id: number) => void,
  ): void {
    const queue: Queue = this.queueService.getQueue();

    const job: Job = queue.create(JobTypeEnum[jobType], jobData);

    if (jobDelayDate !== null) {
      job.delay(jobDelayDate);
    }

    job.save((err: any) => {
      if (!err) {
        console.log(`Successfully scheduled job with id ${job.id}.`);
      } else {
        console.error(`Failed to schedule job id ${job.id}.`);
      }
    });

    queue.process(
      JobTypeEnum.CheckTaskDone,
      (job: { id: any; data: any }, done: () => void) => {
        processCallback(job.id);
        console.log(`Processed job ${job.id} with data:`, job.data);
        done();
      },
    );
  }
}
