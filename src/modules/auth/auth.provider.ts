import { Injectable } from '@nestjs/common';

import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserAuthRepository } from './repository/register.repository';

@Injectable()
export class AuthProvider {
  constructor(private authRepository: UserAuthRepository) {}

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
