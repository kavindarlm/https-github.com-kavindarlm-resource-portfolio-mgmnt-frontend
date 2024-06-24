export class CreateJobRoleDto {
    roleId: number;
    roleName: string;
    createdBy: number;
}

export type CreateJobRoleParams = {
    roleId: number;
    roleName: string;
    createdBy: number;
}
