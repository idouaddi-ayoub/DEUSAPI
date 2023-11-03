import { Module } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';

@Module({
  controllers: [MembershipController],
  providers: [MembershipService, Neo4jService],
})
export class MembershipModule {}
