import { Module } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';

@Module({
  providers: [MembershipService, Neo4jService],
  exports: [MembershipService],
  controllers: [MembershipController],
})
export class MembershipModule {}
