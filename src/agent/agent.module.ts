import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Agent } from './agent.model';
import { AgentFacade } from './agent.facade';
import { AgentRepository } from './agent.repository';

@Module({
  imports: [SequelizeModule.forFeature([Agent])],
  controllers: [AgentController],
  providers: [AgentFacade, AgentRepository],
  exports: [AgentRepository],
})
export class AgentModule {}
