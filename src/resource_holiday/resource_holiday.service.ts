import { Injectable } from '@nestjs/common';
import { CreateResourceHolidayDto } from './dto/create-resource_holiday.dto';
import { UpdateResourceHolidayDto } from './dto/update-resource_holiday.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceHoliday } from './entities/resource_holiday.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResourceHolidayService {
  constructor(
    @InjectRepository(ResourceHoliday)
    private resourceHolidaysRepository: Repository<ResourceHoliday>) {}
  
    async getResourceHolidaysByResourceId(resourceId: string) {
      return await this.resourceHolidaysRepository
        .createQueryBuilder('resourceHoliday')
        .leftJoinAndSelect('resourceHoliday.holiday', 'holiday')
        .leftJoinAndSelect('resourceHoliday.resource', 'resource')
        .where('resource.resourceId = :resourceId', { resourceId })
        .getMany();
    }
}
