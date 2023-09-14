import { Injectable } from '@nestjs/common';

@Injectable({})
export class bookmarkServices {
  bookMark() {
    return { msg: 'Hello form bookmark' };
  }
}
