import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './login.dto';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private PrismaService: PrismaService) { }

 async login(loginDto: loginDto) {
    // const user = await this.PrismaService.user.findUnique({
    //   where: { email: loginDto.email }
    // })

    // if (!user) {
    //   throw new Error('User not found')
    // }

    // const isPasswordValid = bcrypt.compareSync(
    //   loginDto.password,
    //   user.password
    // )

    // if (!isPasswordValid) {
    //   throw new Error('Invalid password')

    // }

    // const token = this.jwtService.sign({
    //   name: user.name, email: user.email,
    // })
    return { access_token:  this.jwtService }
  }

}
