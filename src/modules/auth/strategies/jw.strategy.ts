import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { IJwtPayload } from './jwt-payload.interface';
import { ConfigurationAPP } from 'src/configs/app/config';
import { UserRepository } from 'src/modules/user/user-repository';
import { ConfigService } from 'src/configs/app/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(ConfigurationAPP.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { username } = payload;
    const user = await this.userRepository.findUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
