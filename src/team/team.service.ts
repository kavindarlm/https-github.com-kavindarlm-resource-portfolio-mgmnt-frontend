import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto, CreateTeamParams, UpdateTeamParams } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  //connect databse
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    
    
){}

//team services

//method to get all teams
findTeams(){
    //get all the team records from the teams table
    return this.teamRepository.find();
    //{relations:['profile']}- to get the profile details of the user
    //{relations:['posts']}- to get the post details of the user
}

//method to fetch team
//method to fetch team by id
async getTeamById(team_id: number): Promise<Team> {
  const team = await this.teamRepository.findOne({ where: { team_id: team_id } });
  if (!team) {
    throw new NotFoundException(`Team with ID ${team_id} not found`);
  }
  return team;
}

//method to create a team
createTeam(teamDetails: CreateTeamParams){
    //create new users according to the user details passed
    const newTeam = this.teamRepository.create({
        ...teamDetails,
        
    });
    return this.teamRepository.save(newTeam);

}

//method to update teams
updateTeam(team_id :number,updateTeamDetails:UpdateTeamParams){
//id - which user to update
return  this.teamRepository.update({team_id},{...updateTeamDetails});
}



//method to delete users
deleteTeam(id:number){
    //id - which user to delete
    return this.teamRepository.delete({team_id:id});
}

async deleteTeamById(id: number): Promise<void> {
    const team = await this.teamRepository.findOneBy({team_id:id});
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    await this.teamRepository.delete(id);
  }

}
