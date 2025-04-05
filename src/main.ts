import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './setup-swagger';
import { HttpErrorFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService); // Import and use ConfigService
  // Use the HttpErrorFilter globally
  app.useGlobalFilters(new HttpErrorFilter());
  const port = configService.get('PORT', 3000);
  if (configService.get('NODE_ENV', 'production') !== 'production') {
    setupSwagger(app);
  }
  await app.listen(port);
  console.info(`Server running on port ${port}`);
}
bootstrap();
