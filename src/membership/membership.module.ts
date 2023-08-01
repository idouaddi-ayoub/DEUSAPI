import { Module } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { MembershipService } from './membership.service';

@Module({
  providers: [MembershipService, Neo4jService],
  exports: [MembershipService],
})
export class MembershipModule {}
