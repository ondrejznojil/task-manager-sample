import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTaskInput {
  @IsNotEmpty()
  @IsNumber()
  agentId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  durationInMinutes: number;
}
