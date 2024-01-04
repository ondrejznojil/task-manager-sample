import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TaskFacade } from './task.facade';
import { TaskRepository } from './task.repository';
import { AgentModule } from '../agent/agent.module';
import { TaskDueCalculatorService } from './taskDue/taskDueCalculator.service';

@Module({
  imports: [AgentModule, SequelizeModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskFacade, TaskRepository, TaskDueCalculatorService],
})
export class TaskModule {}
