import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import { IJwtPayload } from './jwt-payload.interface';
import { ConfigurationAPP } from 'src/configs/app/config';
import { UserRepository } from 'src/modules/user/user-repository';
import { ConfigService } from 'src/configs/app/config.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(ConfigurationAPP.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    try {
      const { username } = payload;
      const user = await this.userRepository.findUsername(username);

      if (!user) {
        throw new UnauthorizedException();
      }
      this.logger.info('payload:', payload, JwtStrategy.name);
      return payload;
    } catch (error) {
      this.logger.error('Error :', error.stack, JwtStrategy.name);
    }
  }
}
