import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().setTitle('Backend PF - Expreso Rivadavia')
    .setDescription('API - Proyecto final')
    .setVersion('0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
