import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  //   authService: AuthService;
  //   constructor(authService: AuthService) {
  //     this.authService = authService;
  //   }
  //also can declare in above way
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signUp();
  }

  @Post('signin')
  signin() {
    return this.authService.signIn();
  }
}
