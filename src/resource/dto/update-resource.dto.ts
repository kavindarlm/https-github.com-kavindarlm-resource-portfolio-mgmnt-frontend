import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './create-resource.dto';

export class UpdateResourceDto {
    resourceName: string;
    resourceId: string;
    roleId: number;
    unitId: number;
    teamId: number;
}

export type UpdateResourceParams = {
    resourceName: string;
    resourceId: string;
    roleId: number;
    unitId: number;
    teamId: number;
};
