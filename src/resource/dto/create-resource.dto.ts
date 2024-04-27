export class CreateResourceDto {
    resourceName: string;
    resourceId: string;
    roleId: number;
    unitId: number;
    teamId: number;
}

export type CreateResourceParams = {
    resourceName: string;
    resourceId: string;
    roleId: number;
    unitId: number;
    teamId: number;
};
