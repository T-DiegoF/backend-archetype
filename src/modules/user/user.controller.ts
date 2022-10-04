import {
  CacheInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guard/user.guard';
import { UserService } from './user.provider';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private userProvider: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @UseInterceptors(CacheInterceptor)
  getUserInfo(@Request() req) {
    try {
      return this.userProvider.findUser(req.user.id);
    } catch (error) {
      console.log('error controller');
    }
  }
}
