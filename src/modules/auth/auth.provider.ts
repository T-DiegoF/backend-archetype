import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  create(registerDTO: RegisterDTO): Promise<void> {
    return this.authRepository.register(registerDTO);
  }

  async login(loginDTO: LoginDTO): Promise<any> {

    try {
      const { username, password } = loginDTO;


      const user: User = await this.userRepository.findOne(username)

      if (!user) {
        throw new NotFoundException('user not found');
      }

      console.log("pass", user.username)
      const isMatch = await compare(password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Wrong password');
      }

      const payload: IJwtPayload = {
        id: user.id,
        username: user.username
      };

      const token = await this.jwtService.sign(payload);

      return { token };
    } catch (error) {
      console.log("ERROR auth provider", error)

    }



  }
}