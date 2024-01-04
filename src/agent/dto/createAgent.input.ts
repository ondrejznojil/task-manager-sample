import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateAgentInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
