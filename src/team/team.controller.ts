import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { JwtAuthGuard } from 'src/Auth/jwtauthGuard';

@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private teamService: TeamService) { }

  //get all teams
  @Get()
  async getTeams() {
    return this.teamService.findTeams();

  }

  //create a team by updating teamid column in resource table
  @Post()
  async createTeamAndAssignResources(@Body() formData: CreateTeamDto): Promise<Team> {
    return this.teamService.createTeamAndAssignResources(formData);
  }

  //get team data by it's id
  @Get(':id')
  async getTeamById(@Param('id') id: number): Promise<Team> {
    const team = await this.teamService.getTeamById(id);
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  //update teams
  @Put(':id')
  async updateTeam(@Param('id') id: string, @Body() updatedTeam: Partial<Team>): Promise<Team> {
    return this.teamService.updateTeam(id, updatedTeam);
  }

  //delete team
  @Delete(':id')
  deleteTeam(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.teamService.deleteTeamById(id);
}

}
