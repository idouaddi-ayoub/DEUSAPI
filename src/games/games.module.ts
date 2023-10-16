import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService, Neo4jService],
})
export class GamesModule {}
