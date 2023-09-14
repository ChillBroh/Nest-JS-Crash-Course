import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  signUp() {
    return { msg: 'I am signed Up' };
  }
  signIn() {
    return { msg: 'I am signed in' };
  }
}
