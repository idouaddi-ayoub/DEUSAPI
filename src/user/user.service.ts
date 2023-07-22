import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Node } from 'neo4j-driver';
import { CreateUserDto } from './dto/create-user.dto';

export type User = Node;

@Injectable()
export class UserService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const res = await this.neo4jService.write(
      `
        CREATE (u:User) 
        SET u += $properties, u.id = randomUUID()
        RETURN u.properties`,
      {
        properties: {
          email: dto.email,
          password: dto.password,
          username: dto.username,
          dateOfBirth: dto.username,
        },
      },
    );

    return res.records[0].get('u');
  }
}
