// auth.dto.ts
import { ApiProperty } from '@nestjs/swagger'

export class authDto {
  @ApiProperty({ example: 'usuario@exemplo.com', description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  password: string;
}
