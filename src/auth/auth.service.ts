import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  async signUp(@Res() res: Response, dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);

    //save new user into db
    try {
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
      //delete data before sending
      // delete user.email;
      //return user
      res.status(200).send({
        message: 'success',
        data: user,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('User Already exists');
      }
      throw error;
    }
  }
  async signIn(dto: AuthDto) {
    //find user by emal
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
        },
      });

      //if user not found throw an exception  }
      if (!user) throw new ForbiddenException('User Not found');

      //check the password
      const passwordMatch = await argon.verify(user.hash, dto.password);

      //if password wrong throw an exception
      if (!passwordMatch) throw new ForbiddenException('Password is incorrect');

      //send back the user
      // delete user.hash;
      return this.signInToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        return error.message;
      }
      throw error;
    }
  }

  async signInToken(
    userID: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userID, email };

    const token = await this.jwt.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
