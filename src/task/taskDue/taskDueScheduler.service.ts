import { Injectable } from '@nestjs/common';
import { SchedulerService } from '../../queue/service/scheduler.service';
import { Task } from '../task.model';
import JobTypeEnum from '../../queue/enum/jobType.enum';

@Injectable()
export class TaskDueSchedulerService {
  constructor(private readonly schedulerService: SchedulerService) {}

  private processCallback(id: number): void {
    console.log(
      `Job id ${id} has not been done in time. Imagine the event is logged in Maria or some noSQL DB.`,
    );
  }

  public scheduleCheckTaskDoneJob(task: Task) {
    this.schedulerService.scheduleJob(
      JobTypeEnum.CheckTaskDone,
      { taskId: task.id },
      task.dueAt,
      this.processCallback,
    );
  }
}
