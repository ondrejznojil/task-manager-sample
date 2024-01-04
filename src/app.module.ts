import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { TaskModule } from './task/task.module';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './config/config';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    AgentModule,
    TaskModule,
    QueueModule,
    SequelizeModule.forRoot({
      ...config.database,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
