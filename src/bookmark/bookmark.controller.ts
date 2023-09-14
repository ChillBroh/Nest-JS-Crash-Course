import { Controller, Get } from '@nestjs/common';
import { bookmarkServices } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: bookmarkServices) {}

  @Get()
  BookMark() {
    return this.bookmarkService.bookMark();
  }
}
