export class CreateTeamDto {
    teamName: string;
    team_description: string;
    resourceIds: string[] = [];
    createdBy: number;
}

export type CreateTeamParams = {
teamName: string;
team_description: string;
resourceIds: string[];
createdBy: number;

};

export type UpdateTeamParams = {
team_Name: string;
team_description: string; 

};
