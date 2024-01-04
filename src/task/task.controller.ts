import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskFacade } from './task.facade';
import { CreateTaskInput } from './dto/createTask.input';
import { Task } from './task.model';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskFacade: TaskFacade) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTask(@Body() createTaskInput: CreateTaskInput) {
    const task: Task = await this.taskFacade.createTask(createTaskInput);
    return { success: true, task };
  }

  @Post(':taskId/markAsDone')
  async markTaskAsDone(@Param('taskId') taskId: number) {
    const task: Task = await this.taskFacade.markTaskAsDone(taskId);

    return { success: true, task };
  }
}
