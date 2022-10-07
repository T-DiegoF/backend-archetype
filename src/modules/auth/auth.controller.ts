import {
  Controller,
  Body,
  Post,
  BadRequestException,
  Inject,
  UseFilters,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UnauthorizedExceptionFilter } from 'src/exceptionsFilter/httpexception.filter';
import { Logger } from 'winston';
import { AuthProvider } from './auth.provider';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authProvider: AuthProvider,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('register')
  async createUser(@Body() registerDTO: RegisterDTO): Promise<void> {
    try {
      return await this.authProvider.create(registerDTO);
    } catch (error) {
      this.logger.error('Error:', error.stack, AuthController.name);
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  @UseFilters(UnauthorizedExceptionFilter)
  async loginUser(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
    try {
      return await this.authProvider.login(loginDTO);
    } catch (error) {
      this.logger.error('Error:', error.stack, AuthController.name);
      throw new UnauthorizedException(error.message);
    }
  }
}
