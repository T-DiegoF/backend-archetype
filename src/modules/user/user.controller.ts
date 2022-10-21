import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  CACHE_MANAGER,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UnauthorizedExceptionFilter } from 'src/modules/auth/exceptionsFilter/unauthorizedException.filter';
import { Logger } from 'winston';
import { JwtAuthGuard } from './guard/user.guard';
import { TransformInterceptor } from './interceptor/response.interceptor';
import { UserService } from './user.provider';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private userProvider: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  @Get('info')
  @ApiResponse({ status: 201, description: 'success' })
  @ApiResponse({ status: 401, description: 'Invalid token' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheKey('user-info')
  @UseInterceptors(TransformInterceptor)
  @UseFilters(UnauthorizedExceptionFilter)
  async getUserInfo(@Request() req) {
    try {
      this.logger.info('Calling findUser(req.user.id)', {
        controller: UserController.name,
      });
      return await this.userProvider.findUser(req.user.id);
    } catch (error) {
      this.logger.error(
        'Error UserController:',
        error.stack,
        UserController.name,
      );
      throw new ForbiddenException();
    }
  }
}
