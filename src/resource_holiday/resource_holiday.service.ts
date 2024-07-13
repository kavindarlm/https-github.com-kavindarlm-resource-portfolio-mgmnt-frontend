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
    private resourceHolidaysRepository: Repository<ResourceHoliday>) { }

  //method to get holidays by resourceId
  async getResourceHolidaysByResourceId(resourceId: string) {
    return await this.resourceHolidaysRepository
      .createQueryBuilder('resourceHoliday')
      .leftJoinAndSelect('resourceHoliday.holiday', 'holiday')
      .leftJoinAndSelect('resourceHoliday.resource', 'resource')
      .where('resource.resourceId = :resourceId', { resourceId })
      .getMany();
  }

  // method to get absenties count of the day
  async getCountOfResourcesWithHolidayToday(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today, assuming date stored without time
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    return this.resourceHolidaysRepository
      .createQueryBuilder('resourceHoliday')
      .innerJoin('resourceHoliday.holiday', 'holiday') // Ensure the join is correctly specified
      .where('holiday.date >= :today AND holiday.date < :tomorrow', { today, tomorrow })
      .select('COUNT(DISTINCT resourceHoliday.id)', 'count') 
      .getRawOne()
      .then(result => parseInt(result.count));
  }
}
