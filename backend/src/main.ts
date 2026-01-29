import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET_KEY_COOKIE || 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // true in production HTTPS
        maxAge: 1000 * 60 * 60,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Agendamento API')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addCookieAuth('jwt', {
      type: 'http',
      in: 'cookie',
      scheme: 'bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: false, // do not keep authentication between reloads
      },
    });
  }

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4001);
}
bootstrap();
