export class updateTaskDto{
    taskProgressPercentage: number;
}

export class updateTaskDetailsDto{
    taskName: string;
    exStartDate: string;
    exEndDate: string;
    taskDescription: string; 
    taskAllocationPercentage: number;
    taskProgressPercentage: number;
    updatedBy: number;
}