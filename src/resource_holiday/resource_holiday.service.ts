import { Injectable } from '@nestjs/common';
import { CreateResourceHolidayDto } from './dto/create-resource_holiday.dto';
import { UpdateResourceHolidayDto } from './dto/update-resource_holiday.dto';

@Injectable()
export class ResourceHolidayService {
  create(createResourceHolidayDto: CreateResourceHolidayDto) {
    return 'This action adds a new resourceHoliday';
  }

  findAll() {
    return `This action returns all resourceHoliday`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resourceHoliday`;
  }

  update(id: number, updateResourceHolidayDto: UpdateResourceHolidayDto) {
    return `This action updates a #${id} resourceHoliday`;
  }

  remove(id: number) {
    return `This action removes a #${id} resourceHoliday`;
  }
}
