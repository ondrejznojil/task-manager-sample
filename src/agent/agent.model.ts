import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Agent extends Model {
  @Column
  name: string;

  @Column({
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email: string;
}
