import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Node } from 'neo4j-driver';
import { UpdateUserDto } from './dto/update-user.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { CreateUserDto } from './dto/create-user.dto';

export type User = Node;

@Injectable()
export class UserService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async getUserById(id: number) {
    const user = await this.neo4jService.read(
      `
      MATCH (u:User)
      WHERE ID(u) = ${id}
      RETURN u
    `,
      {},
    );

    return user;
  }

  async createUser(UserData: CreateUserDto) {
    const user = await this.neo4jService.write(
      ` CREATE (u:User) 
        SET u += $properties, u.id = randomUUID()
        RETURN u
        `,
      {
        properties: {
          username: UserData.username,
          password: await this.encryptionService.hash(UserData.password),
          email: UserData.email,
        },
      },
    );
    return user;
  }

  async updateUser(id: number, UserData: UpdateUserDto) {
    const user = await this.neo4jService.write(
      `
            MATCH (u:User)
            WHERE ID(u) = ${id}
            SET u += $properties
            RETURN u
        `,
      {
        properties: {
          username: UserData.username,
          password: await this.encryptionService.hash(UserData.password),
          email: UserData.email,
        },
      },
    );
    return user;
  }
}
