import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { Req } from '@nestjs/common';
import { UsersFunctionService } from '../users_function/users_function.service';

const generatePassword = (length: number, chars: string): string => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

@Controller('api')
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService,private readonly usersFunctionService: UsersFunctionService) { }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto & { password: string }) {
    let password = generatePassword(8, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
    createUserDto.password = password;
    if (!createUserDto.password) {
      throw new BadRequestException('Password is required');
    }

    const hashedPassword = await bcrypt.hashSync(password, 12);

    const user: { password?: string, user_id: number } = await this.userService.create({ ...createUserDto, password: hashedPassword });

    delete user.password;
    return {
      password: password, //in this movement we are returning the password for only testing purposes, this should be pass to the user email adderss
      user_id: user.user_id,
      message: 'User created successfully'
    }
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    console.log('Incoming Login Request');
    const user = await this.userService.findLoginUser({ where: { user_email: createUserDto.user_email } });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!await bcrypt.compare(createUserDto.password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.user_id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Login success'
    }
  }


  //get user details after login
  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException('Unauthorized');
      }

      const user = await this.userService.findLoginUser({ where: { id: data['id'] } });
      const { password, ...result } = user;

      return result;

    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  //logout
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    console.log('Incoming Logout Request');

    return {
      message: 'Logout success'
    }
  }


  //find all users
  @Get('findAll')
  findAll() {
    return this.userService.findAll();
  }


  //find single user by id
  @Get('find/:id')
  findSingleUser(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }


  //update user by id
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    return this.userService.updateUserById(id, updateUser);
  }

  //delete user by id
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersFunctionService.deleteUserFunction(id);
    return this.userService.deleteUserById(id);
  }

  //  controller for searching projects by project name
  @Get('searchUserName/search')
  async searchUsers(@Req() req: Request){
    const builder = await this.userService.searchUser('user_name');;

    if(req.query.s){
      builder.where('user_name.user_name like :s', {s: `%${req.query.s}%`});
    }
    return builder.getMany(); 
  }
}
