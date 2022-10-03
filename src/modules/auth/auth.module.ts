import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.provider';
import { Address } from './entities/address.entity';
import { City } from './entities/city.entitiy';
import { Country } from './entities/country.entity';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { UserAuthRepository } from './repository/register.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User, Address, City, Country])],

  providers: [AuthProvider, UserAuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
