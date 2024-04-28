import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceHolidayService } from './resource_holiday.service';
import { CreateResourceHolidayDto } from './dto/create-resource_holiday.dto';
import { UpdateResourceHolidayDto } from './dto/update-resource_holiday.dto';

@Controller('resource-holiday')
export class ResourceHolidayController {
  constructor(private readonly resourceHolidayService: ResourceHolidayService) {}

  @Post()
  create(@Body() createResourceHolidayDto: CreateResourceHolidayDto) {
    return this.resourceHolidayService.create(createResourceHolidayDto);
  }

  @Get()
  findAll() {
    return this.resourceHolidayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceHolidayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResourceHolidayDto: UpdateResourceHolidayDto) {
    return this.resourceHolidayService.update(+id, updateResourceHolidayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceHolidayService.remove(+id);
  }
}
