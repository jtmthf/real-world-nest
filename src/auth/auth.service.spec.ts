import { Test, TestingModule } from '@nestjs/testing';
import { mock, instance, when, anyString } from 'ts-mockito';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { hash } from 'argon2';

describe('AuthService', () => {
  let service: AuthService;
  const mockedUsersService = mock(UsersService);
  const mockedJwtService = mock(JwtService);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: instance(mockedUsersService) },
        { provide: JwtService, useValue: instance(mockedJwtService) },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should verify the password', async () => {
    when(mockedUsersService.findByEmail(anyString())).thenReturn(
      Promise.resolve(
        new User({ username: 'test', passwordHash: await hash('password') }),
      ),
    );

    const user = await service.validateUser('test@example.com', 'password');

    expect(user).toEqual({ username: 'test' });
  });

  it('should return null when incorrect password', async () => {
    when(mockedUsersService.findByEmail(anyString())).thenReturn(
      Promise.resolve(
        new User({ username: 'test', passwordHash: await hash('password') }),
      ),
    );

    const user = await service.validateUser('test@example.com', 'incorrect');

    expect(user).toBeNull();
  });
});
