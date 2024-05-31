import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceHolidayService } from './resource_holiday.service';
import { CreateResourceHolidayDto } from './dto/create-resource_holiday.dto';
import { UpdateResourceHolidayDto } from './dto/update-resource_holiday.dto';

@Controller('resource-holiday')
export class ResourceHolidayController {
  constructor(private readonly resourceHolidayService: ResourceHolidayService) {}

  @Get(':resourceId')
  async getResourceHolidaysByResourceId(@Param('resourceId') resourceId: string) {
    return await this.resourceHolidayService.getResourceHolidaysByResourceId(resourceId);
  }
  

}
