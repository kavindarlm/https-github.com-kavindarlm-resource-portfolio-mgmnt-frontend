import { Module } from '@nestjs/common';
import { ResourceHolidayService } from './resource_holiday.service';
import { ResourceHolidayController } from './resource_holiday.controller';

@Module({
  controllers: [ResourceHolidayController],
  providers: [ResourceHolidayService]
})
export class ResourceHolidayModule {}
