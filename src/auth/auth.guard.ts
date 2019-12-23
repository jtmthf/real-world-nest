import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { AuthMode } from '../common/enums';
import { AUTHENTICATION_MODE } from '../common/constants';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const mode =
      this.reflector.get<AuthMode | undefined>(
        AUTHENTICATION_MODE,
        context.getHandler(),
      ) || AuthMode.None;
    if (mode === AuthMode.None) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(
    err: Error | null,
    user: any,
    info: any,
    context: ExecutionContext,
  ) {
    const mode = this.reflector.get<AuthMode>(
      AUTHENTICATION_MODE,
      context.getHandler(),
    );
    if (mode === AuthMode.Required && (err || !user)) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
