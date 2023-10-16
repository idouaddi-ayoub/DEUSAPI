import { Injectable } from '@nestjs/common';
import { Node } from 'neo4j-driver';
import { Neo4jService } from '../neo4j/neo4j.service';

export type Membership = Node;

@Injectable()
export class MembershipService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async createMembership(id: number) {
    const user = await this.neo4jService.write(
      `
      MATCH (u:User)
      WHERE ID(u) = ${id}
      CREATE (u)-[:BOUGHT]->(m:Membership {id: randomUUID(), date: datetime()})
      RETURN u, m
    `,
      {},
    );
    return user;
  }

  async getUserMembership(id: number) {
    const user = await this.neo4jService.read(
      `
      MATCH (u:User)-[:BOUGHT]-(m:Membership)
      WHERE ID(u) = ${id}
      RETURN u
    `,
      {},
    );
    return user;
  }
}
