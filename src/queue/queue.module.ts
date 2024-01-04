// queue.module.ts

import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { SchedulerService } from './service/scheduler.service';

@Module({
  providers: [QueueService, SchedulerService],
  exports: [QueueService, SchedulerService],
})
export class QueueModule {}
