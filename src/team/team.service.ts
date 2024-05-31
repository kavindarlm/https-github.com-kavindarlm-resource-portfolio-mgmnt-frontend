import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto, CreateTeamParams, UpdateTeamParams } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { EntityManager, Repository } from 'typeorm';
import { Resource } from 'src/resource/entities/resource.entity';

@Injectable()
export class TeamService {
  teamsService: any;
  teamData: any;

  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(Resource) private readonly resourceRepository: Repository<Resource>,
    @InjectEntityManager() private entityManager: EntityManager){}

    async getTeams(): Promise<Team[]> {
      return this.teamRepository.find();
    }

    
 //method to get all teams
  findTeams() {
    //get all the team records from the teams table
    return this.teamRepository.find();
    //{relations:['profile']}- to get the profile details of the user
    //{relations:['posts']}- to get the post details of the user
  }

  //method to create team by updating teamid column in resource table
  async createTeamAndAssignResources(createTeamParams: CreateTeamParams): Promise<Team> {
    const { teamName, team_description, resourceIds } = createTeamParams;
  
    // Map 'teamName' to 'team_Name'
    const team_Name = teamName;
  
    // Create a new team
    const team = this.teamRepository.create({ team_Name, team_description });
    await this.teamRepository.save(team);
  
    // Assign resources to the team
    for (const resourceId of resourceIds) {
      const resource = await this.resourceRepository.findOne({ where: { resourceId: resourceId } });
      if (resource) {
        resource.teamId = team.teamId; // Update the teamId field of the resource
        await this.resourceRepository.save(resource);
      }
    }
  
    return team;
  }

  // Method to get a team by ID
  async getTeamById(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ 
      where: { teamId: id }, 
      relations: ['resources', 'resources.org_unit', 'resources.job_role'] 
    });
  
    if (team) {
      team.resources = team.resources.map(resource => ({
        ...resource,
        roleName: resource.job_role.roleName,
        unitName: resource.org_unit.unitName
      }));
    }
  
    return team;
  }

  //method to update team data
  async updateTeam(id: string, updatedTeam: Partial<Team>): Promise<Team> {
    const teamId = Number(id);
    const team = await this.teamRepository.findOne({ where: { teamId: teamId } });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    Object.assign(team, updatedTeam);
    return this.teamRepository.save(team);
  }

  //method to delete team by id
  async deleteTeamById(id: number): Promise<void> {
    await this.entityManager.transaction(async transactionalEntityManager => {
        // reassign all resources associated with the team to null
        await transactionalEntityManager
            .createQueryBuilder()
            .update(Resource)
            .set({ teamId: null })
            .where("teamId = :id", { id })
            .execute();

        //delete the team
        const result = await transactionalEntityManager
            .createQueryBuilder()
            .delete()
            .from(Team)
            .where("id = :id", { id })
            .execute();

        if (result.affected === 0) {
            throw new NotFoundException(`Team with ID ${id} not found`);
        }
    });
}



}
