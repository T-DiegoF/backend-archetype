import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../user/user.provider';
import { AuthProvider } from './auth.provider';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authProvider: AuthProvider) {}

  @Post('register')
  async createUser(@Body() registerDTO: RegisterDTO): Promise<void> {
    return this.authProvider.create(registerDTO);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async loginUser(@Body() loginDTO: LoginDTO) {
    return this.authProvider.login(loginDTO);
  }
}
