
export class UpdateProjectDto {
    projectName: string;
    projectStartDate: string;
    projectEndDate: string;
    criticality_id: number;
    projectManager_id: string;
    deliveryManager_id: string;
    projectDescription: string; 
    updatedBy: number;
}
