import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserRepository } from '../user/user-repository';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User } from './entities/user.entity';
import { UserAuthRepository } from './repository/register.repository';
import { IJwtPayload } from './strategies/jwt-payload.interface';

@Injectable()
export class AuthProvider {
  constructor(
    private authRepository: UserAuthRepository,
  ) { }

  create(registerDTO: RegisterDTO): Promise<void> {
    return this.authRepository.register(registerDTO);
  }

  async login(loginDTO: LoginDTO): Promise<{ token: string }> {
    try {
      return this.authRepository.login(loginDTO);

    } catch (error) {
      console.log("error service")
    }

  }
}