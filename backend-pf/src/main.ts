import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { ValidationPipe } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env.development' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // Retorna un error si se envían propiedades no declaradas
      transform: true, // Transforma el payload a la instancia del DTO
    }),
  );

  app.enableCors({
    origin: process.env.URL_FRONT,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Backend PF - Expreso Rivadavia')
    .setDescription('API - Proyecto final')
    .setVersion('0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const firebaseApp = initializeApp({
    apiKey: "AIzaSyACOK4mhj7ZGV1UWIvDkIMm4Jys0MpKEOI",
    authDomain: "proyecto-final-web-ft49-grupo8.firebaseapp.com",
    projectId: "proyecto-final-web-ft49-grupo8",
    storageBucket: "proyecto-final-web-ft49-grupo8.appspot.com",
    messagingSenderId: "559365938466",
    appId: "1:559365938466:web:0724d71cc3db97e46dd97b",
    measurementId: "G-CDJXZVWQV9"
  });

  const storage = getStorage(firebaseApp)
  await app.listen(process.env.PORT);
}
bootstrap();
