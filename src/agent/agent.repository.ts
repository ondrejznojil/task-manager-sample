import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Agent } from './agent.model';

@Injectable()
export class AgentRepository {
  constructor(
    @InjectModel(Agent)
    private readonly agentModel: typeof Agent,
  ) {}

  async createAgent(agentData: Partial<Agent>): Promise<Agent> {
    return this.agentModel.create(agentData);
  }

  async findAgentByEmail(email: string): Promise<Agent | null> {
    return await this.agentModel.findOne({ where: { email } });
  }
}
