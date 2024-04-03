import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Function } from './entities/function.entity';
import { FunctionsService } from './functions.service';
import { FunctionsController } from './functions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Function])],
  controllers: [FunctionsController],
  providers: [FunctionsService],
})
export class FunctionsModule {}