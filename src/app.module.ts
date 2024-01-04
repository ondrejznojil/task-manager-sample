import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './config/config';

@Module({
  imports: [
    AgentModule,
    SequelizeModule.forRoot({
      ...config.database,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
