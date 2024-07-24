import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  static setup = (app: INestApplication) => {
    const config = new DocumentBuilder()
      .setTitle('API Back Ecommerce')
      .setDescription('Documentação das rotas do backend do ecommerce')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document);
  };
}
