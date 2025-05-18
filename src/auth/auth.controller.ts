// auth.controller.ts
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { authDto } from './auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiBody({ type: authDto })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  login(@Body() authDto: authDto) {
    return this.authService.login(authDto);
  }
}
