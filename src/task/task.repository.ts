import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task)
    private readonly agentModel: typeof Task,
  ) {}

  async createTask(taskData: Partial<Task>, dueAt: Date): Promise<Task> {
    return this.agentModel.create({
      ...taskData,
      dueAt,
    });
  }
}
