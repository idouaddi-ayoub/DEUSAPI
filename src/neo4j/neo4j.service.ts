import { Injectable } from '@nestjs/common';
import { Neo4jConfig } from '../neo4j/neo4j-config/neo4j-config.interface';
import neo4j, { Driver, Result } from 'neo4j-driver';
import { createDriver } from './neo4j-config/neo4j-util';

@Injectable()
export class Neo4jService {
  private readonly config: Neo4jConfig = {
    scheme: 'neo4j',
    host: 'localhost',
    port: 7693,
    username: 'neo4j',
    password: '12345678',
  };
  private driver: Driver;

  constructor() {
    this.initiateDriver();
  }

  private async initiateDriver() {
    this.driver = await createDriver(this.config);
  }

  private getConfig(): Neo4jConfig {
    return this.config;
  }

  private getDriver(): Driver {
    return this.driver;
  }

  private getReadSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.READ,
    });
  }

  private getWriteSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.WRITE,
    });
  }

  read(cypher: string, params: Record<string, any>, database?: string): Result {
    const session = this.getReadSession(database);
    return session.run(cypher, params);
  }

  write(
    cypher: string,
    params: Record<string, any>,
    database?: string,
  ): Result {
    const session = this.getWriteSession(database);
    return session.run(cypher, params);
  }
}
