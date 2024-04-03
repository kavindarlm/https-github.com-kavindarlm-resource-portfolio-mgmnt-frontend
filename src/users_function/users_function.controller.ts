import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersFunctionService } from './users_function.service';
import { CreateUsersFunctionDto } from './dto/create-users_function.dto';
import { UpdateUsersFunctionDto } from './dto/update-users_function.dto';

@Controller('users-function')
export class UsersFunctionController {
  constructor(private readonly usersFunctionService: UsersFunctionService) {}

  @Post()
  create(@Body() createUsersFunctionDto: CreateUsersFunctionDto) {
    return this.usersFunctionService.create(createUsersFunctionDto);
  }

  @Get()
  findAll() {
    return this.usersFunctionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersFunctionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersFunctionDto: UpdateUsersFunctionDto) {
    return this.usersFunctionService.update(+id, updateUsersFunctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersFunctionService.remove(+id);
  }
}
