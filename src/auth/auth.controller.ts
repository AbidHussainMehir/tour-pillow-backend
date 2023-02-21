
import { Controller, Get, Request,Body, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {UserLogin} from "./dto/user-login.dto"
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  // @ApiBearerAuth()
  @Post('login')
  async login(@Request() req,@Body() user: UserLogin) {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      console.log({ error })
      return error;
    }
  }

}
