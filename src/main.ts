import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Neo4jErrorFilter } from 'nest-neo4j/dist';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new Neo4jErrorFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
