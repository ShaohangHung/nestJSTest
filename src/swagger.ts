import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = async (app) => {
  const config = new DocumentBuilder()
    .setTitle('TodoList')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
