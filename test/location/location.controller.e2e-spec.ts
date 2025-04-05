import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

import { APP_GUARD } from '@nestjs/core';
import { UserEntity } from '../../src/user/user.entity'; // Import UserEntity
import { DataSource } from 'typeorm'; // Import DataSource
import { UserRole } from '../../src/auth/dto/signup.dto';
import { JwtAuthGuard } from '../../src/auth/jwt-auth.guard';

describe('LocationController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource; // Add DataSource reference
  let user: UserEntity; // Add UserEntity reference

  const canActivate = jest.fn();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource); // Get DataSource instance

    // Create a new user
    user = new UserEntity();
    user.username = Math.random().toString(36).substring(2, 15);
    user.password = 'password';
    user.role = UserRole.ADMIN;
    await dataSource.getRepository(UserEntity).save(user); // Save the user

    // Mock canActivate to bypass authorization
    canActivate.mockImplementation((context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.user = { id: user.id, username: user.username, role: user.role }; // Set user details
      return true; // Explicitly allow access
    });
  });

  afterAll(async () => {
    // Clean up the created user
    await dataSource.getRepository(UserEntity).delete({ id: user.id });
    await app.close();
  });

  describe('/locations (POST)', () => {
    it('should create a new location', async () => {
      const response = await request(app.getHttpServer())
        .post('/locations')
        .send({
          name: 'Building A',
          code: 'A',
          area: 1000,
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'Building A');
      expect(response.body).toHaveProperty('code', 'A');
      expect(response.body).toHaveProperty('area', 1000);
    });

    it('should return 400 for invalid parameters', async () => {
      await request(app.getHttpServer())
        .post('/locations')
        .send({
          name: 1,
          code: 1,
          area: -100,
        })
        .expect(400);
    });
  });

  describe('/locations (GET)', () => {
    it('should return all locations', async () => {
      const response = await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/locations/:id (GET)', () => {
    it('should return a specific location by ID', async () => {
      const location = await request(app.getHttpServer())
        .post('/locations')
        .send({
          name: 'Building B',
          code: 'B',
          area: 2000,
        })
        .expect(201);

      const response = await request(app.getHttpServer())
        .get(`/locations/${location.body.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', location.body.id);
      expect(response.body).toHaveProperty('name', 'Building B');
    });

    it('should return 404 for a non-existent ID', async () => {
      await request(app.getHttpServer())
        .get('/locations/non-existent-id')
        .expect(404);
    });
  });

  describe('/locations/:id (PUT)', () => {
    it('should update a specific location by ID', async () => {
      const location = await request(app.getHttpServer())
        .post('/locations')
        .send({
          name: 'Building C',
          code: 'C',
          area: 3000,
        })
        .expect(201);

      const response = await request(app.getHttpServer())
        .put(`/locations/${location.body.id}`)
        .send({
          name: 'Building C Updated',
          code: 'C-Updated',
          area: 3500,
        })
        .expect(200);

      expect(response.body).toHaveProperty('name', 'Building C Updated');
      expect(response.body).toHaveProperty('code', 'C-Updated');
      expect(response.body).toHaveProperty('area', 3500);
    });

    it('should return 400 for invalid parameters', async () => {
      const location = await request(app.getHttpServer())
        .post('/locations')
        .send({
          name: 'Building D',
          code: 'D',
          area: 4000,
        })
        .expect(201);

      await request(app.getHttpServer())
        .put(`/locations/${location.body.id}`)
        .send({
          name: '',
          code: '',
          area: -100,
        })
        .expect(400);
    });
  });

  describe('/locations/:id (DELETE)', () => {
    it('should delete a specific location by ID', async () => {
      const location = await request(app.getHttpServer())
        .post('/locations')
        .send({
          name: 'Building E',
          code: 'E',
          area: 5000,
        })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/locations/${location.body.id}`)
        .expect(200);
    });

    it('should return 404 for a non-existent ID', async () => {
      await request(app.getHttpServer())
        .delete('/locations/non-existent-id')
        .expect(404);
    });
  });
});
