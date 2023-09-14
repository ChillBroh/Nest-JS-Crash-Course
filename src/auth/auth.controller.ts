import { Controller, Post, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
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
  signup(@Req() req: Request) {
    console.log(req.body);
    return this.authService.signUp(req.body.email);
  }

  //using dto
  @Post('signup2')
  signup2(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
    return this.authService.signUp(dto);
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

  //
  @Post('signin')
  signin() {
    return this.authService.signIn();
  }
}
