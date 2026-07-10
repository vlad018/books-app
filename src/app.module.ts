import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';

import {
  ThrottlerGuard,
  ThrottlerModule,
} from '@nestjs/throttler';

import { BooksModule } from './books/books.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BooksModule,
AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100000000000000000000000000000000000,
      },
    ]),
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}