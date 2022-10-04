import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserAuthRepository } from './repository/register.repository';

@Injectable()
export class AuthProvider {
  constructor(private authRepository: UserAuthRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

  create(registerDTO: RegisterDTO): Promise<void> {
    return this.authRepository.register(registerDTO);
  }

  async login(loginDTO: LoginDTO): Promise<{ token: string }> {
    try {
      return this.authRepository.login(loginDTO);
    } catch (error) {
      console.log('error service');
    }
  }
}
