import { PartialType } from '@nestjs/mapped-types';
import { CreateCriticalityDto } from './create-criticality.dto';

export class UpdateCriticalityDto extends PartialType(CreateCriticalityDto) {}
