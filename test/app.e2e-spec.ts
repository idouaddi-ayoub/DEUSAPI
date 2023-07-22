import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });


  describe('Auth', () => {
    describe('POST /auth/register', () => {
      const body: CreateUserDto = {
        email: 'chi7aja@gmail.com',
        dateOfBirth: '2023-01-22',
        username: 'lolrandomxd',
        password: 'lol',
      };
      it('Should validate request', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .set('Accept', 'application/json')
          .send({body})
          .expect(400)
          .expect((res) => {
            expect(res.body.message);
          });
      });

      // it('say balls', () => {
      //   let email = `${Math.random()}@gmail.com`
      //   const body: CreateUserDto = {
      //     email,
      //     dateOfBirth: '2023-01-22',
      //     username: 'lolrandomxd',
      //     password: 'bruhrabua57',
      //   };
      //   return request(app.getHttpServer())
      //   .post('/auth/register')
      //     .set('Accept', 'application/json')
      //     .send(body)
      //     .expect(201)
      //     .expect((res) => {
      //       expect(res.body.mail).toBe(email);
      //     });
      // })
    });
  });
});
