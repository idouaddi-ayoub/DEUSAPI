import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { EncryptionService } from 'src/encryption/encryption.service';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'process.env.CLERK_PEM_PUBLIC_KEY', // undefined
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, EncryptionService, Neo4jService],
})
export class AuthModule {}
