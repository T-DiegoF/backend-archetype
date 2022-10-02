import { Controller, Get, Body } from '@nestjs/common';
import { AuthProvider } from './auth.provider';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authProvider: AuthProvider) { }

  @Get('register')
  async createUser(@Body() registerDTO: RegisterDTO): Promise<void> {
    return this.authProvider.create(registerDTO);
  }
}
