import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserRepository } from '../../modules/user/user-repository';
import { UserController } from '../../modules/user/user.controller';
import { UserService } from '../../modules/user/user.provider';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfiguration from '../app/app.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration]
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        socket: {
          host: config.get('redis.host'),
          port: +config.get('redis.port'),
        },
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule { }
