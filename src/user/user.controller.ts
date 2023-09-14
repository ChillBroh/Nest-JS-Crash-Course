import { Controller, Get } from '@nestjs/common';
import { Userservice } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: Userservice) {}

  @Get()
  user() {
    return this.userService.user();
  }
}
