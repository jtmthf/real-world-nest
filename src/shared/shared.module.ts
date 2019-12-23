import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '../common/interceptors';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useFactory: ConfigService.init,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [ConfigService],
})
export class SharedModule {}
