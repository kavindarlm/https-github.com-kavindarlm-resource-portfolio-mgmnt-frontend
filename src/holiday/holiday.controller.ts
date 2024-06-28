import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Holiday } from './entities/holiday.entity';
import { JwtAuthGuard } from 'src/Auth/jwtauthGuard';
import { GetUser } from 'src/Auth/get-user.decorator';

@Controller('holiday')
@UseGuards(JwtAuthGuard)
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) { }

  @Get('/is-today-holiday')
  async isTodayAHoliday(): Promise<{ isHoliday: boolean }> {
    const isHoliday = await this.holidayService.isTodayAHoliday();
    return { isHoliday };
  }
  
  //post global holidays 
  @Post()
  async addEvent(@Body() createHolidayDto: CreateHolidayDto, @GetUser() user : any): Promise<Holiday> {
    createHolidayDto.createdBy = user.id;
    const { selectedDates, holidayType, resourceIds, createdBy } = createHolidayDto;
    const dateObj = selectedDates[0]; // assuming selectedDates is an array of date objects
    const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
    return this.holidayService.addEvent(date, holidayType, resourceIds, createdBy);
  }

  //post resource holiday
  @Post('resource')
  async resourceAddEvent(@Body() createHolidayDto: CreateHolidayDto, @GetUser() user: any): Promise<Holiday[]> {
    createHolidayDto.createdBy = user.id;
    const { selectedDates, holidayType, resourceIds, createdBy } = createHolidayDto;
    const holidays = [];

    for (const resourceId of resourceIds) {
      const holiday = await this.holidayService.resourceAddEvent(selectedDates, holidayType, resourceId, createdBy);
      holidays.push(...holiday);
    }

    return holidays;
  }

  //get global holidays by holiday type
  @Get(':type')
  getHolidaysByType(@Param('type') type: string) {
    return this.holidayService.getHolidaysByType(type);
  }

  //edit global holidays 
  @Put(':id')
  async updateHoliday(
    @Param('id') id: string,
    @Body() updateHolidayDto: UpdateHolidayDto,
    @GetUser() user: any
  ): Promise<Holiday> {
    updateHolidayDto.updatedBy = user.id;
    return this.holidayService.updateHoliday(id, updateHolidayDto);
  }

  //delete global holiday
  @Delete(':id')
  async deleteHoliday(@Param('id') id: string): Promise<void> {
    return this.holidayService.deleteHoliday(id);
  }

  //delete resource holiday 
  @Delete('resource-holiday/:holy_id')
  async deleteResourceHoliday(@Param('holy_id') holy_id: string) {
    try {
      await this.holidayService.deleteResourceHoliday(holy_id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //get all resources
  @Get()
  async findAll(): Promise<{ resourceId: string, roleName: string, unitName: string }[]> {
    return this.holidayService.findAll();
  }



}
