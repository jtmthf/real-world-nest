import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { WRAPPED_NAME } from '../constants';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const name = this.reflector.get<string | undefined>(
      WRAPPED_NAME,
      context.getHandler(),
    );
    const $res = next.handle();

    return name ? $res.pipe(map(data => ({ [name]: data }))) : $res;
  }
}
