import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({ example: 'João', description: 'Nome do usuário' })
  name: string;
  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  email: string;
  @ApiProperty({ example: '12345', description: 'Senha do usuário' })
  password: string;

}
