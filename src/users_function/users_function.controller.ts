import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersFunctionService } from './users_function.service';
import { CreateUsersFunctionDto } from './dto/create-users_function.dto';
import { UpdateUsersFunctionDto } from './dto/update-users_function.dto';
import { JwtAuthGuard } from 'src/Auth/jwtauthGuard';

@Controller('users-function')
@UseGuards(JwtAuthGuard)
export class UsersFunctionController {
  constructor(private readonly usersFunctionService: UsersFunctionService) {}

  @Post('/registerUsersFunction')
  create(@Body() createUsersFunctionDto: CreateUsersFunctionDto) {
    return this.usersFunctionService.create(createUsersFunctionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getUserFunction/:id')
  findone(@Param('id') id: string) {
    return this.usersFunctionService.findFunctionIdByUserId(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/updateUserFunction/:id')
  update(@Param('id') id: string, @Body() updateUsersFunctionDto: UpdateUsersFunctionDto) {
    return this.usersFunctionService.updateUserFunction(+id, updateUsersFunctionDto);
  } 

  // @Delete('/deleteUserFunction/:id')
  // remove(@Param('id') id: string) {
  //   return this.usersFunctionService.deleteUserFunction(+id);
  // }

}
