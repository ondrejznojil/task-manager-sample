import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AgentFacade } from './agent.facade';
import { CreateAgentInput } from './dto/createAgent.input';

@Controller('agents')
export class AgentController {
  constructor(private readonly agentFacade: AgentFacade) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAgent(@Body() createAgentInput: CreateAgentInput) {
    const { name, email } = createAgentInput;
    const agent = await this.agentFacade.createAgent(name, email);
    return { success: true, agent };
  }
}
