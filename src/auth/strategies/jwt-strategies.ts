import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtModule.register({
        secret: `${process.env.JWT_SECRET}`,
        signOptions: { expiresIn: '3600s' },
      }),
    });
  }

  validate(payload: number) {
    const user = this.neo4jService.read(
      `
      MATCH (u:User)
      WHERE ID(u) = ${payload}
      RETURN u
      `,
      {},
    );
    return user;
  }

  //work with cypher
  // async validate(login: LoginDto) {
  //   const user = await this.authService.validateUser(
  //     login.username,
  //     login.password,
  //   );
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
