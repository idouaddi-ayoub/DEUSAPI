import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Node } from 'neo4j-driver';
import { UpdateUserDto } from './dto/update-user.dto';
import { EncryptionService } from '../encryption/encryption.service';
import { CreateUserParams } from 'src/util/types';

export type User = Node;

@Injectable()
export class UserService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.neo4jService.read(
      `
      MATCH (u:User  {username: $username})
      RETURN u
    `,
      { username },
    );

    return user.records.length == 1 ? user.records[0].get('u') : undefined;
  }

  async createUser(UserData: CreateUserParams): Promise<User> {
    const user = await this.neo4jService.write(
      ` CREATE (u:User) 
        SET u += $properties, u.id = randomUUID()
        RETURN u`,
      {
        properties: {
          password: await this.encryptionService.hash(UserData.password),
          username: UserData.username,
          lol: UserData.lol,
          chi7aja: UserData.chi7aja,
        },
      },
    );

    return user.records[0].get('u');
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
