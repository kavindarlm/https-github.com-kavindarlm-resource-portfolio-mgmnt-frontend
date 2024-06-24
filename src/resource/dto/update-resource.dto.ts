

export class UpdateResourceDto {
    resourceName: string;
    resourceId: string;
    roleId: number;
    unitId: number;
    teamId: number;
    updatedBy: number;
}

export type UpdateResourceParams = {
    resourceName: string;
    resourceId: string;
    roleId: number;
    unitId: number;
    teamId: number;
    updatedBy: number;
};
