import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { Req } from '@nestjs/common';
import { request } from 'http';

const generatePassword = (length: number, chars: string): string => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

@Controller('api')
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto & { password: string }) {
    let password = generatePassword(8, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
    createUserDto.password = password;
    if (!createUserDto.password) {
      throw new BadRequestException('Password is required');
    }

    const hashedPassword = await bcrypt.hashSync(password, 12);

    const user = await this.userService.create({ ...createUserDto, password: hashedPassword });

    delete user.password;
    return {
      message: 'User created successfully'
    }
    //return password; //in this movement we are returning the password for only testing purposes, this should be pass to the user email adderss
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    console.log('Incoming Login Request');
    const user = await this.userService.findLoginUser({ where: { email: createUserDto.user_email } });

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



  @Patch(':id')
  updateUser(@Param('id') id : number,@Body() updateUser : UpdateUserDto){
    return this.userService.updateUserById(id,updateUser);
  }


  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
