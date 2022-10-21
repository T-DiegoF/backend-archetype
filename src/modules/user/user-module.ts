import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '../../configs/redis/redis.module';
import { User } from '../auth/entities/user.entity';
import { UserRepository } from './user-repository';
import { UserController } from './user.controller';
import { UserService } from './user.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CacheModule.register()],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserRepository, UserService],
})
export class UserModule { }
