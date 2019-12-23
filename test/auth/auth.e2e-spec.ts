import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { AppModule } from '../../src/app.module';
import { bootstrap } from '../../src/bootstrap';
import { JwtService } from '@nestjs/jwt';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let container: StartedTestContainer;

  beforeAll(async () => {
    container = await new GenericContainer('postgres', '12.1-alpine')
      .withExposedPorts(5432)
      .withEnv('POSTGRES_USER', 'real_world')
      .withEnv('POSTGRES_PASSWORD', 'password')
      .start();
    process.env.POSTGRES_HOST = container.getContainerIpAddress();
    process.env.POSTGRES_PORT = String(container.getMappedPort(5432));
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await bootstrap(() => moduleFixture.createNestApplication());
    await app.init();
  });

  afterAll(async () => {
    await container.stop();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/users (POST)', async () => {
    const {
      body: {
        user: { bio, email, image, token, username },
      },
    } = await request(app.getHttpServer())
      .post('/api/users')
      .send({
        user: {
          username: 'Jacob',
          email: 'jake@jake.jake',
          password: 'jakejake',
        },
      })
      .expect(201);

    expect(email).toBe('jake@jake.jake');
    expect(username).toBe('Jacob');
    expect(token).toBeTruthy();
    expect(bio).toBeNull();
    expect(image).toBeNull();
  });
});
