import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Agent } from '../agent/agent.model';

@Table
export class Task extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  dueAt: Date;

  @Column({
    allowNull: true,
  })
  completedAt: Date;

  @ForeignKey(() => Agent)
  @Column
  agentId: number;

  @BelongsTo(() => Agent)
  agent: Agent;
}
