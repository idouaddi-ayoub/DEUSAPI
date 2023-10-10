import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  lol: number;

  @IsNotEmpty()
  chi7aja: string;
}
