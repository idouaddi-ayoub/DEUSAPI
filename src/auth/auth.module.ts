import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { User, UserService } from '../user/user.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { EncryptionService } from '../encryption/encryption.service';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../local/local.strategy';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { EncryptionModule } from '../encryption/encryption.module';
import { MembershipModule } from '../membership/membership.module';
import { PassportModule } from '@nestjs/passport';
import { Record } from 'neo4j-driver';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: ConfigService.get<string | number>('JWT_EXPIRES_IN'),
        },
      }),
    }),
    UserModule,
    EncryptionModule,
    MembershipModule,
  ],
  providers: [
    AuthService,
    UserService,
    Neo4jService,
    EncryptionService,
    ConfigService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [
    AuthController,
    // UserController, UsersController, ProfileController
  ],
})
export class AuthModule {
  constructor(private readonly neo4jService: Neo4jService) {}

  // onModuleInit() {
  //   return Promise.all([
  //     this.neo4jService
  //       .write(
  //         'CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE',
  //         Record<User>,
  //       )
  //       .catch((e) => {}),
  //     this.neo4jService
  //       .write(
  //         'CREATE CONSTRAINT ON (u:User) ASSERT u.email IS UNIQUE',
  //         Record<User>,
  //       )
  //       .catch((e) => {}),
  //   ]);
  // }
}
