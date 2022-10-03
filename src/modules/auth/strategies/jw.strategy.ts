import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { IJwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { ConfigurationAPP } from 'src/configs/app/config';
import { UserRepository } from 'src/modules/user/user-repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(ConfigurationAPP.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { username } = payload;
    const user = await this.userRepository.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
