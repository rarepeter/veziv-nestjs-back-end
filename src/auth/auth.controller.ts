import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() authDto: AuthDto) {
    return await this.authService.signUp(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() authDto: AuthDto) {
    return await this.authService.signIn(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify-token/:accesstoken')
  verifyToken(@Param('accesstoken') accessToken: string) {
    return this.authService.verifyToken(accessToken);
  }
}
