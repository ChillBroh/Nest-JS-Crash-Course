import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { bookmarkServices } from './bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [bookmarkServices],
})
export class BookmarkModule {}
