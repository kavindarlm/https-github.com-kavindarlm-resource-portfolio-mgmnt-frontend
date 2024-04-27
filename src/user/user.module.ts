import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersFunctionService } from 'src/users_function/users_function.service';
import { UsersFunctionModule } from 'src/users_function/users_function.module';
import { UsersFunction } from 'src/users_function/entities/users_function.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersFunction]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' },
  }),
  UsersFunctionModule
],
  controllers: [UserController],
  providers: [UserService, UsersFunctionService]
})
export class UserModule {}
