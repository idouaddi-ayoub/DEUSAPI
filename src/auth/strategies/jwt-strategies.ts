import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login-user.dto';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly neo4jService: Neo4jService;
  constructor() {
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
