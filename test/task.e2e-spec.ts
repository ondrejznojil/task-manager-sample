import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AgentRepository } from '../src/agent/agent.repository';
import { Agent } from '../src/agent/agent.model';
import { TaskRepository } from '../src/task/task.repository';
import { Task } from '../src/task/task.model'; // Update the path accordingly

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let agent: Agent;
  let task: Task;
  let taskRepository: TaskRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    taskRepository = moduleFixture.get(TaskRepository);

    agent = await moduleFixture.get(AgentRepository).createAgent({
      name: 'name',
      email: 'ondrejznojil@gmail.com',
    });

    task = await moduleFixture.get(TaskRepository).createTask(
      {
        name: 'test',
        description: 'test',
        agentId: agent.id,
        durationInMinutes: 200,
      },
      new Date(),
    );

    await app.init();
  });

  beforeEach(async () => {
    // Reset the database before each test
  });

  afterAll(async () => {
    await app.close();
  });

  it('/tasks (POST) - Create Task', async () => {
    const createTaskInput = {
      agentId: agent.id,
      name: 'name',
      description: 'description',
      durationInMinutes: 60,
    };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskInput)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.task).toBeDefined();

    const createdTask = await taskRepository.findTaskById(
      response.body.task.id,
    );

    expect(createdTask).not.toBeNull();
  });

  it('/tasks/:taskId/markAsDone (POST) - Mark Task as Done', async () => {
    const response = await request(app.getHttpServer())
      .post(`/tasks/${task.id}/markAsDone`)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.task).toBeDefined();
    expect(response.body.task.completedAt).toBeDefined();

    const reloadedTask = await taskRepository.findTaskById(task.id);
    expect(reloadedTask.completedAt).not.toBeNull();
  });

  it('/tasks/:taskId/markAsDone (POST) - Mark Task as again', async () => {
    await request(app.getHttpServer())
      .post(`/tasks/${task.id}/markAsDone`)
      .expect(422);
  });

  it('/tasks/:taskId/markAsDone (POST) - Not existing task', async () => {
    await request(app.getHttpServer())
      .post(`/tasks/666/markAsDone`)
      .expect(404);
  });
});
