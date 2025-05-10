import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private JwtService: JwtService, private PrismaService: PrismaService) {

  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']?.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException('No token Provided')
    }

    try {
      const payload = await this.JwtService.verify(token, { algorithms: ['HS256'] })
      const user = await this.PrismaService.user.findUnique({
        where: { id: payload.sub }
      })

      if (!user) {
        throw new UnauthorizedException('User not found')
      }

      request.user = user

      return true

    } catch (error) {
      console.error(error)

      throw new UnauthorizedException("invalid token", { cause: error })
    }

    return true;
  }
}
