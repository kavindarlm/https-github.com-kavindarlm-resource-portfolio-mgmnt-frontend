import { Module } from '@nestjs/common';
import { ResourceHolidayService } from './resource_holiday.service';
import { ResourceHolidayController } from './resource_holiday.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceHoliday } from './entities/resource_holiday.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceHoliday])],
  controllers: [ResourceHolidayController],
  providers: [ResourceHolidayService]
})
export class ResourceHolidayModule {}
