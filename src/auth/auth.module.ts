import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { EncryptionService } from '../encryption/encryption.service';
import { ConfigService } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [UserModule, JwtModule],
  providers: [
    AuthService,
    UserService,
    Neo4jService,
    EncryptionService,
    ConfigService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
