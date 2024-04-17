import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersFunctionService } from './users_function.service';
import { CreateUsersFunctionDto } from './dto/create-users_function.dto';
import { UpdateUsersFunctionDto } from './dto/update-users_function.dto';

@Controller('users-function')
export class UsersFunctionController {
  constructor(private readonly usersFunctionService: UsersFunctionService) {}

  @Post('/registerUsersFunction')
  create(@Body() createUsersFunctionDto: CreateUsersFunctionDto) {
    return this.usersFunctionService.create(createUsersFunctionDto);
  }

  @Get('/getUserFunction/:id')
  findone(@Param('id') id: string) {
    return this.usersFunctionService.findFunctionIdByUserId(+id);
  }

  @Patch('/updateUserFunction/:id')
  update(@Param('id') id: string, @Body() updateUsersFunctionDto: UpdateUsersFunctionDto) {
    return this.usersFunctionService.updateUserFunction(+id, updateUsersFunctionDto);
  } 

  // @Delete('/deleteUserFunction/:id')
  // remove(@Param('id') id: string) {
  //   return this.usersFunctionService.deleteUserFunction(+id);
  // }

}
