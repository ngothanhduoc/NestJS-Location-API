import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const user = Math.random().toString(36).substring(2, 15);

  describe('/auth/signup (POST)', () => {
    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: user,
          password: 'password123',
          role: 'user',
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('username', user);
      expect(response.body).toHaveProperty('role', 'user');
      expect(response.body).toHaveProperty('access_token');
    });

    it('should return 400 for invalid parameters', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          password: 'short',
          role: 'invalidRole',
        })
        .expect(401);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should authenticate a user and return a token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: user,
          password: 'password123',
        })
        .expect(200);

      expect(response.body).toHaveProperty('access_token');
    });

    it('should return 401 for invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'wrongUser',
          password: 'wrongPassword',
        })
        .expect(401);
    });
  });
});
