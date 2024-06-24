import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { JwtAuthGuard } from 'src/Auth/jwtauthGuard';

@Controller('functions')
@UseGuards(JwtAuthGuard)
export class FunctionsController {
  constructor(private readonly functionsService: FunctionsService) {}

  @Post('registerFunction')
  create(@Body() createFunctionDto: CreateFunctionDto) {
    return this.functionsService.create(createFunctionDto);
  }

  @Get('getAllFunctions')
  findAllFunctions() {
    return this.functionsService.findAll();
  }

}
