import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Res } from '@nestjs/common';
import { Response,Request } from 'express';
import { Req } from '@nestjs/common';
import { request } from 'http';

@Controller('api') 
export class UserController {
    constructor(private readonly userService: UserService,
    private jwtService: JwtService
    ) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hashSync(createUserDto.password, 12);

    const user = await this.userService.create({...createUserDto, password: hashedPassword});

    delete user.password;
    return user;
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, 
    @Res({passthrough: true}) response: Response
  ){
    const user = await this.userService.findOne({where: {email: createUserDto.email}});

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!await bcrypt.compare(createUserDto.password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({id: user.id});

    response.cookie('jwt', jwt, {httpOnly: true});

    return {
      message: 'Login success'
    }
  }



  @Get('user')
  async user (@Req() request: Request){
    try{
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.userService.findOne({where: {id: data['id']}});
    const {password, ...result} = user;

    return result;

    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response){
    response.clearCookie('jwt');

    return {
      message: 'Logout success'
    }
  }






  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.userService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
