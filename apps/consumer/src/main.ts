import { NestFactory } from '@nestjs/core';
import { AppModule } from './consumer.module';
import { ConsumerService } from './consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.init();

  const service = app.get(ConsumerService);
  await service.fetchAndLogUsers();

  await app.close();
}
bootstrap();
