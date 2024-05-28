export class CreateTeamDto {
    teamName: string;
    team_description: string;
    resourceIds: string[] = [];
    
    
}

export type CreateTeamParams = {
teamName: string;
team_description: string;
resourceIds: string[];

};

export type UpdateTeamParams = {
team_Name: string;
team_description: string; 

};
