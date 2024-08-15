import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassValidatorPipe } from './pipes';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ClassValidatorPipe());

  const port = configService.getOrThrow<number>('PORT');
  await app.listen(port);
}
bootstrap();
