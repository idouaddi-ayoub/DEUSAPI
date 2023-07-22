import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  dateOfBirth: string;
}
