import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './create-resource.dto';

export class UpdateResourceDto {
    resourceName: string;
    resourceId: string;
    roleId: number;
    // jobRole: string;
    unitId: number;
    // orgUnit: string;
}
