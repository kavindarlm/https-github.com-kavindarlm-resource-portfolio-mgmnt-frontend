export class CreateTeamDto {
        team_Name: string;
        team_description: string;
        
        
}

export type CreateTeamParams = {
    team_Name: string;
    team_description: string;
   
};

export type UpdateTeamParams = {
    team_Name: string;
    team_description: string; 
    
};
