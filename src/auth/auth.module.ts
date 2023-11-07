import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategies';
import { EncryptionService } from 'src/encryption/encryption.service';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Module({
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    EncryptionService,
    Neo4jService,
  ],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class AuthModule {}
