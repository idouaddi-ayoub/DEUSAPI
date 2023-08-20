import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Node } from 'neo4j-driver';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EncryptionService } from '../encryption/encryption.service';

export type User = Node;

@Injectable()
export class UserService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    const res = await this.neo4jService.read(
      `
      MATCH (u:User {username: $username})
      RETURN u
    `,
      { username },
    );

    return res.records.length == 1 ? res.records[0].get('u') : undefined;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const res = await this.neo4jService.write(
      `CREATE (u:User) 
        SET u += $properties, u.id = randomUUID()
        RETURN u`,
      {
        properties: {
          email: dto.email,
          password: await this.encryptionService.hash(dto.password),
          username: dto.username,
          dateOfBirth: dto.dateOfBirth,
        },
      },
    );

    return res.records[0].get('u');
  }

  async update(dto: UpdateUserDto): Promise<User> {
    const res = await this.neo4jService.write(
      `
            MATCH (u:User { id: $id })
            SET u += $properties
            RETURN u
        `,
      {
        properties: {
          email: dto.email,
          username: dto.username,
          dateOfBirth: dto.dateOfBirth,
        },
      },
    );
    return res.records[0].get('u');
  }
}
