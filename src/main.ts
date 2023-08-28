import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Neo4jErrorFilter } from 'nest-neo4j/dist';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use Global Filter
  app.useGlobalFilters(new Neo4jErrorFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
