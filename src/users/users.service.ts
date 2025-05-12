import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private PrismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.PrismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      return {   error: 'Este e-mail já está em uso', code_api_error: 'EXISTING-EMAIL' };
    }

    return this.PrismaService.user.create({
      data: createUserDto, 
    });
  }

  async findAll() {
    return this.PrismaService.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.PrismaService.user.findUnique({ where: { id } });

    if (!user) {
      return { data: { error: 'Usuário não encontrado', code_api_error: 'USER-NOT-FOUND' } };
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.PrismaService.user.findUnique({ where: { id } });

    if (!user) {
      return { data: { error: 'Usuário não encontrado', code_api_error: 'USER-NOT-FOUND' } };
    }

    return this.PrismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    const user = await this.PrismaService.user.findUnique({ where: { id } });

    if (!user) {
      return { data: { error: 'Usuário não encontrado', code_api_error: 'USER-NOT-FOUND' } };
    }

    return this.PrismaService.user.delete({
      where: { id },
    });
  }
}
