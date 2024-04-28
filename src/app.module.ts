import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TeamModule } from './team/team.module';
import { ResourceHolidayModule } from './resource_holiday/resource_holiday.module';
import { HolidayModule } from './holiday/holiday.module';




@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TeamModule, ResourceHolidayModule, HolidayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
