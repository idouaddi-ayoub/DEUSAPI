import { Neo4jService } from './neo4j/neo4j.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly neo4jservice: Neo4jService) {}

  async getHello(): Promise<string> {
    const result = await this.neo4jservice.read(
      `MATCH (n) RETURN count(n) AS count`,
      {},
    );

    const count = result.records[0].get('count');

    return `Hello Neo4j User! The are ${count} nodes in the database`;
  }
}
