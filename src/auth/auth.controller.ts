import { Controller, Post, HttpCode, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { UserDto } from '../users/dto/user.dto';
import { User as UserEntity } from '../users/user.entity';
import {
  ApiWrappedOkResponse,
  ApiWrappedBody,
  ApiWrappedCreatedResponse,
  User,
} from '../common/decorators';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@ApiTags('auth')
@ApiExtraModels(UserDto, LoginDto, RegisterDto)
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  @ApiWrappedOkResponse({
    name: 'user',
    modelName: 'UserDto',
  })
  @ApiWrappedBody({ name: 'user', modelName: 'LoginDto' })
  login(@User() user: UserEntity): Promise<UserDto> {
    return this.authService.login(user);
  }

  @Post()
  @ApiWrappedCreatedResponse({
    name: 'user',
    modelName: 'UserDto',
  })
  @ApiWrappedBody({ name: 'user', modelName: 'RegisterDto' })
  register(@Body('user') dto: RegisterDto): Promise<UserDto> {
    return this.authService.register(dto);
  }
}
