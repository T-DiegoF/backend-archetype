import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserRepository } from 'src/modules/user/user-repository';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.provider';

@Module({
    imports: [CacheModule.register({ isGlobal: true })],
    controllers: [UserController],
    providers: [UserService, UserRepository,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class RedisModule { }
