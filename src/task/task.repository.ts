import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskInput } from './dto/createTask.input';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}

  public async createTask(
    taskData: CreateTaskInput,
    dueAt: Date,
  ): Promise<Task> {
    return this.taskModel.create({
      ...taskData,
      dueAt,
    });
  }

  public async findTaskById(id: number): Promise<Task | null> {
    return this.taskModel.findOne({ where: { id } });
  }
}
