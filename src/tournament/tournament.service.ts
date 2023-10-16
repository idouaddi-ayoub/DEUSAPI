import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';

@Injectable()
export class TournamentService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getTournamentById(id: number) {
    const tournament = await this.neo4jService.read(
      `
        MATCH (t:Tournament)
        WHERE ID(t) = ${id}
        RETURN t
      `,
      {},
    );
    return tournament;
  }

  async createTournament(TournamentData: CreateTournamentDto) {
    const tournament = await this.neo4jService.write(
      `
      CREATE (t:Tournament) 
      SET t += $properties, t.id = randomUUID()
      RETURN t
      `,
      {
        properties: {
          name: TournamentData.name,
          genre: TournamentData.genre,
        },
      },
    );
    return tournament;
  }
}
