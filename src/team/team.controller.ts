import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamController {
      //inject team service
constructor(private teamService: TeamService){

}

//create route
//get request to get teams
@Get()
async getTeams(){
   return this.teamService.findTeams();    
}

//post request to create teams
@Post()
createUser(@Body() createTeamDto: CreateTeamDto){
   return this.teamService.createTeam(createTeamDto);
}
//use retrun - when make a post request it with display the details


//update data in the database
//put used to update entire record
//patch used to update only a portion of the record
@Put(':id')
async updateTeamById(@Param('id',ParseIntPipe) id:number,
               @Body() updateTeamDto: UpdateTeamDto,
               ){
    //parseintpipe - use to give an error if the route paramter in not a number
    //validate route parameter
   await this.teamService.updateTeam(id,updateTeamDto);

}


@Delete(':id')
async deleteTeamById(@Param('id') id: number) {
  return this.teamService.deleteTeamById(id);
}


@Get(':id')
  async getTeamById(@Param('id') id: number) {
    return this.teamService.getTeamById(id);
  }
}
