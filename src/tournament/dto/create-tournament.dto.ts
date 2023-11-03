import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateTournamentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  game: string;

  @IsNumber()
  @IsNotEmpty()
  maxPlayer: number;
}

export class UserJoiningDTO {
  @IsNumber()
  @IsNotEmpty()
  teamId: number;
}

export class CreateMatchDTO {
  @IsNumber()
  @IsNotEmpty()
  parentUuid: number;

  @IsNumber()
  @IsNotEmpty()
  matchUuid: number;

  @IsArray()
  @IsNotEmpty()
  partic: any;

  @IsNumber()
  @IsNotEmpty()
  stage: number;
}
