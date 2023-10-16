import { IsNotEmpty } from 'class-validator';

export class CreateTournamentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  genre: string;
}
