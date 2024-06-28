import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({origin: 'http://localhost:4200', // Reemplaza con la URL de frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,});

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
