import { ConflictException, Injectable } from '@nestjs/common';
import { AgentRepository } from './agent.repository';
import { Agent } from './agent.model';

@Injectable()
export class AgentFacade {
  constructor(private readonly agentRepository: AgentRepository) {}

  async createAgent(name: string, email: string): Promise<Agent> {
    const existingAgent = await this.agentRepository.findAgentByEmail(email);

    if (existingAgent) {
      throw new ConflictException('Agent with this email already exists.');
    }

    const agentData = { name, email };
    return this.agentRepository.createAgent(agentData);
  }
}
