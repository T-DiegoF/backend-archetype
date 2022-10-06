import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserRepository } from 'src/modules/user/user-repository';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.provider';
import * as redisStore from 'cache-manager-redis-store';
import { Logger } from 'winston';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'redis',
        port: 4953,
      },

      isGlobal: true,
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class RedisModule { }
