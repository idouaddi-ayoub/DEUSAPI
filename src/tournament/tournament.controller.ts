import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDTO } from './dto/create-tournament.dto';

@Controller('tournament')
export class TournamentController {
  constructor(private tournamentService: TournamentService) {}

  @Get(':id')
  getTournamentById(@Param('id') id: number) {
    return this.tournamentService.getTournamentById(id);
  }

  @Post()
  createTournament(@Body() createTourney: CreateTournamentDTO) {
    return this.tournamentService.createTournament(createTourney);
  }
}
