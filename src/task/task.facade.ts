import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from './task.model';
import { CreateTaskInput } from './dto/createTask.input';
import { AgentRepository } from '../agent/agent.repository';
import { TaskDueCalculatorService } from './taskDue/taskDueCalculator.service';
import { TaskDueSchedulerService } from './taskDue/taskDueScheduler.service';

@Injectable()
export class TaskFacade {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly agentRepository: AgentRepository,
    private readonly taskDueCalculatorService: TaskDueCalculatorService,
    private readonly taskDueScheduler: TaskDueSchedulerService,
  ) {}

  public async createTask(taskData: CreateTaskInput): Promise<Task> {
    const agent = await this.agentRepository.findAgentById(taskData.agentId);
    if (agent === null) {
      throw new NotFoundException(
        `Agent with specified ID ${taskData.agentId} does not exist.`,
      );
    }

    const dueAt = this.taskDueCalculatorService.calculateDueAt(
      new Date(),
      taskData.durationInMinutes,
    );

    const task = await this.taskRepository.createTask(taskData, dueAt);

    this.taskDueScheduler.scheduleCheckTaskDoneJob(task);

    return task;
  }

  public async markTaskAsDone(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findTaskById(taskId);
    if (task === null) {
      throw new NotFoundException(
        `Task with specified ID ${taskId} does not exist.`,
      );
    }

    if (task.completedAt !== null) {
      throw new UnprocessableEntityException(
        `Task with specified ID ${taskId} has already been marked done.`,
      );
    }

    task.completedAt = new Date();

    return task.save();
  }
}
