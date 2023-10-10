import { Injectable } from '@nestjs/common';
import { Node } from 'neo4j-driver';
import { Neo4jService } from '../neo4j/neo4j.service';
import { User } from '../user/user.service';

export type Membership = Node;

@Injectable()
export class MembershipService {
  constructor(private readonly neo4jService: Neo4jService) {}
  async createMembership(User: User): Promise<Membership> {
    const res = await this.neo4jService.write(
      `
        MERGE (u:User {id: $userId})-[:BOUGHT]-(m:Membership)
        return m
    `,
      { User },
    );
    return res.records[0].get('m');
  }

  async getUserMembership(
    userId: string,
    membershipId: string,
  ): Promise<Membership> {
    const res = await this.neo4jService.read(
      `
      MATCH (u:User)-[:BOUGHT]
      RETURN u
    `,
      { userId, membershipId },
    );
    return res.records[0].get('m');
  }
}
