import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guard/user.guard';



@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {



    @UseGuards(JwtAuthGuard)
    @Get('info')
    getUserInfo(@Request() req) {
        return req.user
    }
}