import { Neo4jService } from './neo4j/neo4j.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly neo4jservice: Neo4jService) {}

  async getNodes(): Promise<string> {
    const result = await this.neo4jservice.read(
      `MATCH (n) RETURN count(n) AS node`,
      {},
    );

    const node = result.records[0].get('node');

    return `There are ${node} nodes in the database`;
  }
}
