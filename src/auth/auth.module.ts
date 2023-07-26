import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { EncryptionService } from '../encryption/encryption.service';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: ConfigService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
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
  controllers: [AuthController],
})
export class AuthModule {}
