import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('NestJS Location API v1 Documentation')
    .addBearerAuth();

  const config = app.get(ConfigService);

  if (config.get('API_VERSION')) {
    documentBuilder.setVersion('v1');
  }

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  console.info(
    `Documentation: http://localhost:${config.get('PORT')}/api/docs`,
  );
}
