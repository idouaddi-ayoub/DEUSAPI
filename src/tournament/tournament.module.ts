import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService, Neo4jService],
})
export class TournamentModule {}
