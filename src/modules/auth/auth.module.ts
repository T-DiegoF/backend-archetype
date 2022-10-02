import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.provider';
import { User } from './entities/user.entity';
import { UserAuthRepository } from './repository/register.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthProvider, UserAuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
