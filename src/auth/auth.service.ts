import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { authDto } from './auth.dto';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private PrismaService: PrismaService) { }

  async login(authDto: authDto) {
    const user = await this.PrismaService.user.findUnique({
      where: { email: authDto.email }
    })

    if (!user) {
      return { error: 'E-mail não cadastrado', code_api_error: 'EMAIL-NOT-FOUND' };
    }

    const isPasswordValid = bcrypt.compareSync(
      authDto.password,
      user.password
    )

    if (!isPasswordValid) {
      return { error: 'Senha invalida', code_api_error: 'PASSWORD-NOT-FOUND' };
    }

    const token = this.jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });

    return { access_token: token };
  }

}
