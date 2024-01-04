import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TaskFacade } from './task.facade';
import { TaskRepository } from './task.repository';
import { AgentModule } from '../agent/agent.module';
import { TaskDueCalculatorService } from './taskDue/taskDueCalculator.service';
import { QueueModule } from '../queue/queue.module';
import { TaskDueSchedulerService } from './taskDue/taskDueScheduler.service';

@Module({
  imports: [QueueModule, AgentModule, SequelizeModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [
    TaskFacade,
    TaskRepository,
    TaskDueCalculatorService,
    TaskDueSchedulerService,
  ],
})
export class TaskModule {}
