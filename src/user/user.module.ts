import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { Userservice } from './user.service';

@Module({
  controllers: [UserController],
  providers: [Userservice],
})
export class UserModule {}
