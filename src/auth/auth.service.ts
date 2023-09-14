import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);

    //save new user into db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
      //select will only return the selected values
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    //return user
    return user;
  }
  signIn() {
    return { msg: 'I am signed in' };
  }
}
