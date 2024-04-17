import { Inject, Injectable } from '@nestjs/common';
import { CreateUsersFunctionDto } from './dto/create-users_function.dto';
import { UpdateUsersFunctionDto } from './dto/update-users_function.dto';
import { Repository } from 'typeorm';
import { UsersFunction } from './entities/users_function.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersFunctionService {

  constructor(@InjectRepository(UsersFunction) private usersFunctionRepository: Repository<UsersFunction>) { }

  async create(createUsersFunctionDto: CreateUsersFunctionDto): Promise<UsersFunction[]> {
    const usersFunctions = createUsersFunctionDto.functionIds.map(async functionId => {
      const usersFunction = new UsersFunction();
      usersFunction.user_id = createUsersFunctionDto.user_id;
      usersFunction.function_id = functionId;
      return this.usersFunctionRepository.save(usersFunction);
    });

    return Promise.all(usersFunctions);
  }

  async findFunctionIdByUserId(user_id: number): Promise<{ user_id: number, functionIds: number[] }> {
    const usersFunctions = await this.usersFunctionRepository.find({ where: { user_id: user_id } });
    const functionIds = usersFunctions.map(usersFunction => usersFunction.function_id);
    return { user_id, functionIds };
  }

  async updateUserFunction(user_id: number, updateUsersFunctionDto: UpdateUsersFunctionDto): Promise<UsersFunction[]> {
    // Find existing entities
    const existingUsersFunctions = await this.usersFunctionRepository.find({ where: { user_id } });
    // Delete entities not in the new list
    const toDelete = existingUsersFunctions.filter(uf => !updateUsersFunctionDto.functionIds.includes(uf.function_id));
    await Promise.all(toDelete.map(uf => this.usersFunctionRepository.delete(uf.user_function_id)));
    // Add new entities
    const toAdd = updateUsersFunctionDto.functionIds.filter(id => !existingUsersFunctions.some(uf => uf.function_id === id));
    const newUsersFunctions = toAdd.map(function_id => {
      const uf = new UsersFunction();
      uf.user_id = user_id;
      uf.function_id = function_id;
      return this.usersFunctionRepository.save(uf);
    });
    return Promise.all(newUsersFunctions);
  }

  async deleteUserFunction(user_id: number): Promise<void> {
    await this.usersFunctionRepository.delete({ user_id });
  }
  
}
