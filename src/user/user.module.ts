import { Module } from '@nestjs/common';
import { EncryptionService } from '../encryption/encryption.service';
import { EncryptionModule } from '../encryption/encryption.module';
import { Neo4jService } from '../neo4j/neo4j.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [Neo4jService, EncryptionService, ConfigService],
  imports: [EncryptionModule],
})
export class UserModule {}
