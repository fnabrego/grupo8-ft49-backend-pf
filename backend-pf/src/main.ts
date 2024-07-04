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
    apiKey: "AIzaSyB3y1gGkI-j5UNRO6N6-hZmj710eIjYmKM",
    authDomain: "expreso-rivadavia.firebaseapp.com",
    projectId: "expreso-rivadavia",
    storageBucket: "expreso-rivadavia.appspot.com",
    messagingSenderId: "249213666149",
    appId: "1:249213666149:web:cc5193f2fd7b68ba48d78c",
    measurementId: "G-6LPE6TVVJS"
  });

  const storage = getStorage(firebaseApp)
  await app.listen(process.env.PORT);
}
bootstrap();
