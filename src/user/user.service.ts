import { Injectable } from '@nestjs/common';

@Injectable({})
export class Userservice {
  user() {
    return { msg: 'Hello from user' };
  }
}
