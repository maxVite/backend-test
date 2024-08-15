import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Param } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { countriesOrderByVatAsc } from './mocks';
import { ClassValidatorPipe } from '../src/pipes';
import { ConfigService } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let config: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    config = app.get(ConfigService);

    app.useGlobalPipes(new ClassValidatorPipe());

    await app.init();
  });

  it('/countries (GET)', () => {
    return request(app.getHttpServer())
      .get('/countries')
      .expect(200)
      .expect(countriesOrderByVatAsc);
  });

  it('/countries (GET), should throw a validation error if order is not "asc" or "desc"', () => {
    return request(app.getHttpServer())
      .get('/countries')
      .query({ order: 'wrong_order' })
      .expect({
        message:
          'Validation failed: [{"isIn":"order must be one of the following values: asc, desc"}]',
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it('/reverse/:word (GET), should reverse provided word', () => {
    return request(app.getHttpServer())
      .get('/reverse/hello')
      .expect(200)
      .expect('OllEh');
  });

  it('/append (GET), should append start and end values to env SIMPLE_ARRAY', () => {
    const start = 'mockStart';
    const end = 'mockEnd';
    const SIMPLE_ARRAY = config.getOrThrow<string[]>('SIMPLE_ARRAY');

    return request(app.getHttpServer())
      .get('/append')
      .query({ start, end })
      .expect(200)
      .expect([start, ...SIMPLE_ARRAY, end]);
  });
});
