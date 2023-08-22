import { Module } from '@nestjs/common';
import { EncryptionService } from '../encryption/encryption.service';
import { EncryptionModule } from '../encryption/encryption.module';
import { Neo4jService } from '../neo4j/neo4j.service';
import { ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [Neo4jService, EncryptionService, ConfigService, UserService],
  imports: [EncryptionModule],
  controllers: [UserController],
})
export class UserModule {}
