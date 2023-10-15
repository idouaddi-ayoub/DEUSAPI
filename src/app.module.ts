import { Module } from '@nestjs/common';
import { Neo4jModule } from './neo4j/neo4j.module';
import { UserModule } from './user/user.module';
import { EncryptionModule } from './encryption/encryption.module';
import { ConfigModule } from '@nestjs/config';
import { MembershipModule } from './membership/membership.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Neo4jModule.forRoot(),
    UserModule,
    EncryptionModule,
    MembershipModule,
    GamesModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
