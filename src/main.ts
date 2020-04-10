import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port:any = process.env.PORT;
  await app.listen(port);
  console.log(`app listen on : ${port}`)

  
}
bootstrap();
