import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private gameService: GamesService) {}

  @Get(':id')
  getGameById(@Param('id') id: number) {
    return this.gameService.getGameById(id);
  }

  @Post()
  addGame(@Body() createGame: CreateGameDto) {
    return this.gameService.addGame(createGame);
  }
}
