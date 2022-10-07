import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfigs from 'src/configs/app/jwt.configs';
import { UserModule } from '../user/user-module';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.provider';
import { Address } from './entities/address.entity';
import { City } from './entities/city.entitiy';
import { Country } from './entities/country.entity';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { AuthRepository } from './repository/register.repository';
import { JwtStrategy } from './strategies/jw.strategy';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfigs),
    TypeOrmModule.forFeature([
      AuthRepository,
      User,
      Profile,
      Address,
      City,
      Country,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get('jwt_secret'),
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
    UserModule,
    ConfigModule,
  ],

  controllers: [AuthController],
  providers: [JwtStrategy, AuthProvider, AuthRepository],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
