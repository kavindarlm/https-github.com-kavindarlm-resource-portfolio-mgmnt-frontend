import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) 
          private userRepo:Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user=this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  findAll() {
    const allusers=this.userRepo.find();
    return allusers;
  }


  async findLoginUser(condition: any): Promise<User> {
    return await this.userRepo.findOne(condition);
  }

  findUserById(id: number): Promise<User> {
    const user = this.userRepo.findOne({where: {user_id: id}});
    return user;
  }

  updateUserById(id : number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  deleteUserById(id: number) {
    return this.userRepo.delete(id);
  }
  
}
