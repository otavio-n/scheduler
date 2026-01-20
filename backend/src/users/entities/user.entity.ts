import { IsString } from 'class-validator';

export class User {
  id: number;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  email: string;
}
