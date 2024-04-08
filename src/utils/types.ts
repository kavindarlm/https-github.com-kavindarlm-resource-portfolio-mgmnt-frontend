//Reason to create types is (reason why you won't need to reuse dto) is because sometimes user might send additional
//properties that you wouldn't need on the server that you wouldn't save on the database

export type CreateResourceParams = {
    resourceName: string;
    resourceId: string;
    roleId: number;
    // jobRole: string;
    unitId: number;
    // orgUnit: string;
};

export type UpdateResourceParams = {
    resourceName: string;
    resourceId: string;
    roleId: number;
    // jobRole: string;
    unitId: number;
    // orgUnit: string;
};

export type CreateJobRoleParams = {
    roleId: number;
    roleName: string;
}

export type UpdateJobRoleParams = {
    roleId: number;
    roleName: string;
}