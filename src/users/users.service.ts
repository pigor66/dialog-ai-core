import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt'


@Injectable()
export class UsersService {

  constructor(private PrismaService: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.PrismaService.user.create({
      data: {
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10)
      }
    })
  }

  findAll() {
    return this.PrismaService.user.findMany();
  }

  findOne(id: string) {
    return this.PrismaService.user.findUnique({
      where: { id },

    });;
  }

  update(id: string, UpdateUserDto: UpdateUserDto) {
    return this.PrismaService.user.update({
      where: { id },
      data: UpdateUserDto
    });;
  }

  remove(id: string) {
    return this.PrismaService.user.delete({
      where: { id }
    })
  }
}
