import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Neo4jErrorFilter } from 'nest-neo4j/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use Global Filter
  app.useGlobalFilters(new Neo4jErrorFilter());

  await app.listen(3000);
}
bootstrap();
