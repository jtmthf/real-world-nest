import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify, hash } from 'argon2';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UserDto } from '../users/dto/user.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await verify(user.passwordHash, password))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id };
    return UserDto.fromEntity(user, this.jwtService.sign(payload));
  }

  async register({ password, ...rest }: RegisterDto) {
    const user = await this.usersService.save(
      new User({
        passwordHash: await hash(password),
        ...rest,
      }),
    );
    return this.login(user);
  }
}
