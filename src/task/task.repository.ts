import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { Agent } from '../agent/agent.model';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}

  async createTask(taskData: Partial<Task>, dueAt: Date): Promise<Task> {
    return this.taskModel.create({
      ...taskData,
      dueAt,
    });
  }

  async findTaskById(id: number): Promise<Task | null> {
    return this.taskModel.findOne({ where: { id } });
  }
}
