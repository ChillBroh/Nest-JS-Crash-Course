import { Controller, Post, Req, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  //   authService: AuthService;
  //   constructor(authService: AuthService) {
  //     this.authService = authService;
  //   }
  //also can declare in above way
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    return this.authService.signUp(res, req.body.email);
  }

  //using dto
  @Post('signup2')
  signup2(@Body() dto: AuthDto, @Res() res: Response) {
    console.log({
      dto,
    });
    return this.authService.signUp(res, dto);
  }

  //pipe for password validator
  @Post('signup3')
  signup1(@Body('email') email: string, @Body('password') password: string) {
    console.log({
      email,
      typeofEmail: typeof email,
      password,
      typeofPass: typeof password,
    });
  }

  @Post('signup4')
  signup4(@Body('email') email: string, @Body('password') password: string) {
    console.log(email, password);
    const obj = { email, password };
    return obj;
  }

  @Post('signup5')
  signup5(@Body() dto: AuthDto) {
    return dto;
  }

  //
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
