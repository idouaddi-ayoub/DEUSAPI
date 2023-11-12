import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { EncryptionService } from 'src/encryption/encryption.service';
import { JwtService } from '@nestjs/jwt';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
    private readonly neo4jService: Neo4jService,
  ) {}

  //work with cypher
  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (
      user &&
      (await bcrypt.compare(
        password,
        await this.encryptionService.hash(password),
      ))
    ) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    const payload = await this.neo4jService.read(
      `
      MATCH (u:User)
      WHERE u.username = "${username}" AND u.password = "${password}"
      RETURN u
    `,
      {},
    );
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
