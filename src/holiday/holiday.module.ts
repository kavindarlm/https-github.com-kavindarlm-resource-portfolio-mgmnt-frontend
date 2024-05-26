import { Module } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { HolidayController } from './holiday.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from './entities/holiday.entity';
import { ResourceHoliday } from 'src/resource_holiday/entities/resource_holiday.entity';
import { Resource } from 'src/resource/entities/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Holiday, ResourceHoliday,Resource])],
  controllers: [HolidayController],
  providers: [HolidayService]
})
export class HolidayModule {}
