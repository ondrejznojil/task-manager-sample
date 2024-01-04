import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AgentRepository } from '../src/agent/agent.repository';

describe('AgentController (e2e)', () => {
  let app: INestApplication;
  let agentRepository: AgentRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    agentRepository = moduleFixture.get(AgentRepository);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Reset the database before each test
  });

  it('/agents (POST) - should create a new agent', async () => {
    const agentData = { name: 'John Doe', email: 'john.doe@example.com' };

    const response = await request(app.getHttpServer())
      .post('/agents')
      .send(agentData)
      .expect(201);

    // Verify the response
    expect(response.body.success).toBe(true);
    expect(response.body.agent).toHaveProperty('id');
    expect(response.body.agent.name).toBe(agentData.name);
    expect(response.body.agent.email).toBe(agentData.email);

    // Verify the record in the database
    const createdAgent = await agentRepository.findAgentByEmail(
      agentData.email,
    );
    expect(createdAgent).toBeTruthy();
    expect(createdAgent.name).toBe(agentData.name);
    expect(createdAgent.email).toBe(agentData.email);
  });

  it('/agents (POST) - should handle duplicate email gracefully', async () => {
    const agentData = {
      name: 'John Doe',
      email: 'john.doe-duplicity@example.com',
    };

    await request(app.getHttpServer())
      .post('/agents')
      .send(agentData)
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/agents')
      .send(agentData)
      .expect(409);

    expect(response.body.message).toBe('Agent with this email already exists.');
  });

  // Other test cases...
});
