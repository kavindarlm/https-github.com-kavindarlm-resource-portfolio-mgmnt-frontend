import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday } from './entities/holiday.entity';
import { Equal, Repository } from 'typeorm';
import { ResourceHoliday } from 'src/resource_holiday/entities/resource_holiday.entity';
import { Resource } from 'src/resource/entities/resource.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class HolidayService {
  constructor(
    @InjectRepository(Holiday)
    private holidaysRepository: Repository<Holiday>,
    @InjectRepository(ResourceHoliday)
    private resourceHolidaysRepository: Repository<ResourceHoliday>,
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
  ) { }

  // post public, bank or mercantile hoildays for all resources
  async addEvent(date: Date, holy_type: string, resourceIds: string[], created_by: number): Promise<Holiday> {
    try {
      if (!date || isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      if (['public', 'bank', 'mercantile'].includes(holy_type)) {
        const resources = await this.resourcesRepository.find();
        resourceIds = resources.map(resource => resource.resourceId);
      }

      const holiday = this.holidaysRepository.create({ date, holy_type, createdBy: { user_id: created_by}});
      await this.holidaysRepository.save(holiday);

      for (const resourceId of resourceIds) {
        const resource = await this.resourcesRepository.findOne({ where: { resourceId: resourceId } });
        if (resource) {
          const resourceHoliday = this.resourceHolidaysRepository.create({ holiday, resource });
          await this.resourceHolidaysRepository.save(resourceHoliday);
        }
      }

      return holiday;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // to post resource holiday
  async resourceAddEvent(selectedDates: { year: number, month: number, day: number }[], holidayType: string, resourceId: string, created_by: number): Promise<Holiday[]> {
    try {
      const resource = await this.resourcesRepository.findOne({ where: { resourceId: resourceId } });
      if (!resource) {
        throw new Error('Resource not found');
      }

      const holidays = [];

      for (const selectedDate of selectedDates) {
        const date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
        const holiday = this.holidaysRepository.create({ date, holy_type: holidayType , createdBy: { user_id: created_by}});
        await this.holidaysRepository.save(holiday);

        const resourceHoliday = this.resourceHolidaysRepository.create({ holiday, resource });
        await this.resourceHolidaysRepository.save(resourceHoliday);

        holidays.push(holiday);
      }

      return holidays;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



  //get holidays by the type 
  async getHolidaysByType(holy_type: string): Promise<Holiday[]> {
    return this.holidaysRepository.find({ where: { holy_type } });

  }

  //update hoilday
  async updateHoliday(holy_id: string, updateHolidayDto: UpdateHolidayDto): Promise<Holiday> {
    const holidayId = Number(holy_id);
    const holiday = await this.holidaysRepository.findOne({ where: { holy_id: holidayId } });
    if (!holiday) {
      throw new NotFoundException(`Holiday with ID ${holy_id} not found`);
    }

    holiday.date = new Date(updateHolidayDto.date);
    holiday.holy_type = updateHolidayDto.holy_type;
    holiday.updatedBy = { user_id: updateHolidayDto.updatedBy} as User;

    await this.holidaysRepository.save(holiday);

    return holiday;
  }


  //delete hoilday
  async deleteHoliday(holy_id: string): Promise<void> {
    const holidayId = Number(holy_id);
    const holiday = await this.holidaysRepository.findOne({ where: { holy_id: holidayId } });
    if (!holiday) {
      throw new NotFoundException(`Holiday with ID ${holy_id} not found`);
    }

    // Get all ResourceHolidays that reference the Holiday
    const resourceHolidays = await this.resourceHolidaysRepository.find({ where: { holiday: Equal(holidayId) } });

    // Delete or update the ResourceHolidays
    for (const resourceHoliday of resourceHolidays) {
      // If you want to delete the ResourceHolidays:
      await this.resourceHolidaysRepository.remove(resourceHoliday);

    }

    await this.holidaysRepository.remove(holiday);
  }

  //delete resource holiday
  async deleteResourceHoliday(holy_id: string): Promise<void> {
    const holidayId = Number(holy_id);
    const holiday = await this.holidaysRepository.findOne({ where: { holy_id: holidayId } });
    if (!holiday) {
      throw new NotFoundException(`Holiday with ID ${holy_id} not found`);
    }
  
    // Check the holiday type
    if (holiday.holy_type === 'public' || holiday.holy_type === 'bank' || holiday.holy_type === 'mercantile') {
      throw new Error(`Cannot delete a ${holiday.holy_type} holiday`);
    }
  
    // Get all ResourceHolidays that reference the Holiday
    const resourceHolidays = await this.resourceHolidaysRepository.find({ where: { holiday: Equal(holidayId) } });
  
    // Delete or update the ResourceHolidays
    for (const resourceHoliday of resourceHolidays) {
      // If you want to delete the ResourceHolidays:
      await this.resourceHolidaysRepository.remove(resourceHoliday);
    }
  
    await this.holidaysRepository.remove(holiday);
  }


  // used to fill resorce table data to backend
  async findAll(): Promise<{ resourceId: string, roleName: string, unitName: string }[]> {
    const resources = await this.resourcesRepository.find({
      relations: ['job_role', 'org_unit']
    });

    return resources.map(resource => ({
      resourceId: resource.resourceId,  // Use resource.id instead of resource.resourceName
      roleName: resource.job_role.roleName,
      unitName: resource.org_unit.unitName
    }));
  }


}

