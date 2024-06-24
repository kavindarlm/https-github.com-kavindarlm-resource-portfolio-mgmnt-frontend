export class UpdateJobRoleDto {
    roleId: number;
    roleName: string;
    updatedBy: number;
}

export type UpdateJobRoleParams = {
    roleId: number;
    roleName: string;
    updatedBy: number;
}
