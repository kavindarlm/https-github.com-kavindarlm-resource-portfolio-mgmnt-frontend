import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Holiday } from './entities/holiday.entity';

@Controller('holiday')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Post()
  async addEvent(@Body() createHolidayDto: CreateHolidayDto): Promise<Holiday> {
    const { selectedDates, holidayType, resourceIds } = createHolidayDto;
    const dateObj = selectedDates[0]; // assuming selectedDates is an array of date objects
    const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
    return this.holidayService.addEvent(date, holidayType, resourceIds);
  }

    //confirm code for post resource holiday
  @Post('resource')
    async resourceAddEvent(@Body() createHolidayDto: CreateHolidayDto): Promise<Holiday[]> {
      const { selectedDates, holidayType, resourceIds } = createHolidayDto;
      const holidays = [];
  
      for (const resourceId of resourceIds) {
        const holiday = await this.holidayService.resourceAddEvent(selectedDates, holidayType, resourceId);
        holidays.push(...holiday);
      }
  
      return holidays;
  }
  
  
  @Get(':type')
  getHolidaysByType(@Param('type') type: string) {
    return this.holidayService.getHolidaysByType(type);
  }

  @Put(':id')
  async updateHoliday(
    @Param('id') id: string,
    @Body() updateHolidayDto: UpdateHolidayDto,
  ): Promise<Holiday> {
    return this.holidayService.updateHoliday(id, updateHolidayDto);
  }

  
  @Delete(':id')
  async deleteHoliday(@Param('id') id: string): Promise<void> {
    return this.holidayService.deleteHoliday(id);
  }

  //get all resources
  @Get()
  async findAll(): Promise<{ resourceId: string, roleName: string, unitName: string }[]> {
    return this.holidayService.findAll();
  }
 
}
