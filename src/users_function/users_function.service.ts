import { Injectable } from '@nestjs/common';
import { CreateUsersFunctionDto } from './dto/create-users_function.dto';
import { UpdateUsersFunctionDto } from './dto/update-users_function.dto';

@Injectable()
export class UsersFunctionService {
  create(createUsersFunctionDto: CreateUsersFunctionDto) {
    return 'This action adds a new usersFunction';
  }

  findAll() {
    return `This action returns all usersFunction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersFunction`;
  }

  update(id: number, updateUsersFunctionDto: UpdateUsersFunctionDto) {
    return `This action updates a #${id} usersFunction`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersFunction`;
  }
}
