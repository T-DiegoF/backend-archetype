import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationAPP } from 'src/configs/app/config';
import { ConfigModule } from 'src/configs/app/config.module';
import { ConfigService } from 'src/configs/app/config.service';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.provider';
import { Address } from './entities/address.entity';
import { City } from './entities/city.entitiy';
import { Country } from './entities/country.entity';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { UserAuthRepository } from './repository/register.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User, Address, City, Country]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(ConfigurationAPP.JWT_SECRET),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],

  providers: [AuthProvider, UserAuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
