import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { authDto } from './auth.dto'


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() authDto: authDto) {
    return this.authService.login(authDto)
  }
}
