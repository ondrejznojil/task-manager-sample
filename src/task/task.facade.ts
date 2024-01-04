import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from './task.model';
import { CreateTaskInput } from './dto/createTask.input';
import { AgentRepository } from '../agent/agent.repository';
import { TaskDueCalculatorService } from './taskDue/taskDueCalculator.service';

@Injectable()
export class TaskFacade {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly agentRepository: AgentRepository,
    private readonly taskDueCalculatorService: TaskDueCalculatorService,
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

    return this.taskRepository.createTask(taskData, dueAt);
  }
}
