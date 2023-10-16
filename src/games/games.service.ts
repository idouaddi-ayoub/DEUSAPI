import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(private neo4jService: Neo4jService) {}

  async getGameById(id: number) {
    const game = await this.neo4jService.read(
      `
        MATCH (g:Game)
        WHERE ID(g) = ${id}
        RETURN g
      `,
      {},
    );
    return game;
  }

  async addGame(GameData: CreateGameDto) {
    const game = await this.neo4jService.write(
      `
      CREATE (g:Game) 
      SET g += $properties, g.id = randomUUID()
      RETURN g
      `,
      {
        properties: {
          name: GameData.name,
          genre: GameData.genre,
        },
      },
    );
    return game;
  }
}
