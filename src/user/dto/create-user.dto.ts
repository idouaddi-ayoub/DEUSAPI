import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
