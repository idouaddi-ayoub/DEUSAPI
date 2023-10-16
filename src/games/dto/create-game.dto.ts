import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  genre: string;
}
