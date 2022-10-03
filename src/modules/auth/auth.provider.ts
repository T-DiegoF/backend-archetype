import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserAuthRepository } from './repository/register.repository';

@Injectable()
export class AuthProvider {
  constructor(private registerRepository: UserAuthRepository) {}

  create(registerDTO: RegisterDTO): Promise<void> {
    return this.registerRepository.register(registerDTO);
  }

  login(loginDTO: LoginDTO): any {
    return this.registerRepository.login(loginDTO);
  }
}
