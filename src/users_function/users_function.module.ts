import { Module } from '@nestjs/common';
import { UsersFunctionService } from './users_function.service';
import { UsersFunctionController } from './users_function.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersFunction } from './entities/users_function.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersFunction])],
  controllers: [UsersFunctionController],
  providers: [UsersFunctionService]
})
export class UsersFunctionModule {}
