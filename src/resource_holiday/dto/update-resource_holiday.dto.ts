import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceHolidayDto } from './create-resource_holiday.dto';

export class UpdateResourceHolidayDto extends PartialType(CreateResourceHolidayDto) {}
