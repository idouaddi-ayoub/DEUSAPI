import { DynamicModule, Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Module({})
export class Neo4jModule {
  static forRoot(): DynamicModule {
    return {
      module: Neo4jModule,
      providers: [Neo4jService],
      exports: [Neo4jService],
    };
  }
}
