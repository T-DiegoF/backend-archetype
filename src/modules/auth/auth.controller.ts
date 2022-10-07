import {
  Controller,
  Body,
  Post,
  Inject,
  UseFilters,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter } from 'src/exceptionsFilter/httpExceptionException.filter';
import { UnauthorizedExceptionFilter } from 'src/exceptionsFilter/unauthorizedException.filter';
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
  ) { }


  @Post('register')
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseFilters(HttpExceptionFilter)
  async createUser(@Body() registerDTO: RegisterDTO): Promise<void> {
    try {
      return await this.authProvider.create(registerDTO);
    } catch (error) {
      this.logger.error('Error:', error.stack, AuthController.name);
      throw new ForbiddenException();
    }
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'success' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @UseFilters(UnauthorizedExceptionFilter)
  async loginUser(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
    try {
      return await this.authProvider.login(loginDTO);
    } catch (error) {
      this.logger.error('Error:', error.stack, AuthController.name);
      throw new UnauthorizedException();
    }
  }
}
