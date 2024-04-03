import { Module } from '@nestjs/common';
import { UsersFunctionService } from './users_function.service';
import { UsersFunctionController } from './users_function.controller';

@Module({
  controllers: [UsersFunctionController],
  providers: [UsersFunctionService]
})
export class UsersFunctionModule {}
