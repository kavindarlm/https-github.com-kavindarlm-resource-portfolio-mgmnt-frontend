import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
    team_Name: string;
    team_description: string;
    updatedBy: number;
   
}
