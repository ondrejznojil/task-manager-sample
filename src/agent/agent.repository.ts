import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Agent } from './agent.model';

@Injectable()
export class AgentRepository {
  constructor(
    @InjectModel(Agent)
    private readonly agentModel: typeof Agent,
  ) {}

  public async createAgent(agentData: Partial<Agent>): Promise<Agent> {
    return this.agentModel.create(agentData);
  }

  public async findAgentByEmail(email: string): Promise<Agent | null> {
    return this.agentModel.findOne({ where: { email } });
  }

  public async findAgentById(id: number): Promise<Agent | null> {
    return this.agentModel.findOne({ where: { id } });
  }
}
