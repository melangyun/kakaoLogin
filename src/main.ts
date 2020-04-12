import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './modules/shared/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
  .addBearerAuth()
  .setTitle("Basic Login & Kakao ")
  .setDescription("API Documents about Basic Login and kakaoLogin interlink")
  .setVersion("1.0")
  .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  
  const port:string = process.env.PORT;
  await app.listen(port);
  console.log(`app listen on : ${port}`)

  
}
bootstrap();
