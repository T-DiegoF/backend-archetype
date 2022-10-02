import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { UserAuthRepository } from './repository/register.repository';

@Injectable()
export class AuthProvider {
  constructor(private registerRepository: UserAuthRepository) { }

  create(registerDTO: RegisterDTO): Promise<void> {
    return this.registerRepository.register(registerDTO);
  }
}
