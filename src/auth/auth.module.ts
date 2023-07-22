import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { Neo4jService } from '../neo4j/neo4j.service';

@Module({
  imports: [UserModule],
  providers: [AuthService, UserService, Neo4jService],
  controllers: [AuthController],
})
export class AuthModule {}
