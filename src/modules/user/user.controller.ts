import {
  CacheInterceptor,
  Controller,
  Get,
  Inject,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from './guard/user.guard';
import { UserService } from './user.provider';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private userProvider: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @UseInterceptors(CacheInterceptor)
  getUserInfo(@Request() req) {
    try {
      this.logger.info('Calling findUser(req.user.id)', { controller: UserController.name });
      return this.userProvider.findUser(req.user.id);
    } catch (error) {
      this.logger.error('Error UserController:', error.stack, UserController.name);
    }
  }
}
