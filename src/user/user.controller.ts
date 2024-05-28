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
import * as nodemailer from 'nodemailer';
import { NotFoundException } from '@nestjs/common';

const generatePassword = (length: number, chars: string): string => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'malinthakavinda24@gmail.com',
    pass: 'hxaynheaabsbghaj'
  }
});

@Controller('api')
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService, private readonly usersFunctionService: UsersFunctionService) { }

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

    // delete user.password;

    const mailOptions = {
      from: 'malinthakavinda24@gmail.com',
      to: createUserDto.user_email,
      subject: 'Tapro Project & Resource management system',
      html: `<h2 style="color: blue;">Welcome to Tapro Resource & Project management system website!</h2>
       <h3 style="color: blue;">Your password :</h3>
       <h3><b style="color: red;">${password}</b></h3>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });


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
      user_id: user.user_id,
      token: jwt,
      user_role: user.user_role,
      user_name: user.user_name,
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

      const user = await this.userService.findLoginUser({ where: { user_id: data['id'] } });
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

  //find all users
  @Get('findAllUsers')
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  //find all admins
  @Get('findAllAdmins')
  findAllAdmins() {
    return this.userService.findAllAdmins();
  }


  //find single user by id
  @Get('find/:id')
  findSingleUser(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  //update user by id
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Update the email if it's different from the current one
    if (updateUser.user_email && updateUser.user_email !== user.user_email) {

      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 12);

      const mailOptions = {
        from: 'malinthakavinda24@gmail.com',
        to: updateUser.user_email,
        subject: 'Tapro Project & Resource management system',
        html: `<h2 style="color: blue;">Welcome to Tapro Resource & Project management system website!</h2>
       <h3 style="color: blue;">Your temporary password :</h3>
       <h3><b style="color: red;">${tempPassword}</b></h3>`,
      };
      // Send the email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      user.user_email = updateUser.user_email;
      user.password = hashedPassword;
    }
    // Update the name if it's different from the current one
    if (updateUser.user_name && updateUser.user_name !== user.user_name) {
      user.user_name = updateUser.user_name;
    }

    return this.userService.updateUserById(id, user);
  }

  //delete user by id
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersFunctionService.deleteUserFunction(id);
    return this.userService.deleteUserById(id);
  }

  //  controller for searching users by user name
  @Get('searchUserName/search')
  async searchUsers(@Req() req: Request) {
    const builder = await this.userService.searchUser('user_name');;

    if (req.query.s) {
      builder.where('user_name.user_name like :s', { s: `%${req.query.s}%` });
    }
    return builder.getMany();
  }

  //update password
  @Post('resetPassword')
  async updatePassword(@Body('user_id') user_id: number, @Body('currentPassword') currentPassword: string, @Body('newPassword') newPassword: string) {
    return this.userService.updatePassword(user_id, currentPassword, newPassword);
  }

  //forgot password
  @Post('forgotPassword')
  async forgotPassword(@Body('user_email') user_email: string) {
    const user = await this.userService.findLoginUser({ where: { user_email: user_email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    const mailOptions = {
      from: 'malinthakavinda24@gmail.com',
      to: user_email,
      subject: 'Tapro Project & Resource management system',
      html: `<h2 style="color: blue;">Welcome to Tapro Resource & Project management system website!</h2>
       <h3 style="color: blue;">Your New temporary password :</h3>
       <h3><b style="color: red;">${tempPassword}</b></h3>`,
    };
    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    user.password = hashedPassword;
    return this.userService.updateUserById(user.user_id, user);
  }

}
