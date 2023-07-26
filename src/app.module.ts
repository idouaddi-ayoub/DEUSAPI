import { Module } from '@nestjs/common';
import { Neo4jModule } from './neo4j/neo4j.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [Neo4jModule.forRoot(), AuthModule, UserModule, EncryptionModule],
})
export class AppModule {}
