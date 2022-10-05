import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { AuthRepository } from './repository/register.repository';

@Injectable()
export class AuthProvider {
  constructor(private authRepository: AuthRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

  create(registerDTO: RegisterDTO): Promise<void> {
    try {
      this.logger.info('Calling create()', { provider: AuthProvider.name });
      return this.authRepository.register(registerDTO);
    } catch (error) {
      this.logger.error('Error:', error.message, AuthProvider.name);
      throw new Error(error.stack);
    }

  }

  async login(loginDTO: LoginDTO): Promise<{ token: string }> {
    try {
      this.logger.info('Calling login()', { provider: AuthProvider.name });
      return this.authRepository.login(loginDTO);
    } catch (error) {
      this.logger.error('Error: invalid credentials', error.message, AuthProvider.name);
      throw new Error(error.stack);
    }
  }
}
