import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.provider';
import { AuthProvider } from './auth.provider';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authProvider: AuthProvider) { }

  @Post('register')
  async createUser(@Body() registerDTO: RegisterDTO): Promise<void> {
    try {
      return this.authProvider.create(registerDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }

  @Post('login')
  async loginUser(@Body() loginDTO: LoginDTO) {
    try {
      return this.authProvider.login(loginDTO);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }

  }
}
