import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/configs/redis/redis.module';
import { User } from '../auth/entities/user.entity';
import { UserRepository } from './user-repository';
import { UserController } from './user.controller';
import { UserService } from './user.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserRepository, UserService],
})
export class UserModule {}
