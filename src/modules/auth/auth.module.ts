import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationAPP, ConfigurationDB } from 'src/configs/app/config';
import { ConfigModule } from 'src/configs/app/config.module';
import { ConfigService } from 'src/configs/app/config.service';
import { UserModule } from '../user/user-module';
import { UserRepository } from '../user/user-repository';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.provider';
import { Address } from './entities/address.entity';
import { City } from './entities/city.entitiy';
import { Country } from './entities/country.entity';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { UserAuthRepository } from './repository/register.repository';
import { JwtStrategy } from './strategies/jw.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserAuthRepository,
      User,
      Profile,
      City,
      Country,
      Address,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(ConfigurationAPP.JWT_SECRET),
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
  providers: [JwtStrategy, AuthProvider, UserAuthRepository],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule { }
