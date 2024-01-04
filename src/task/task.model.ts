import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

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
}
