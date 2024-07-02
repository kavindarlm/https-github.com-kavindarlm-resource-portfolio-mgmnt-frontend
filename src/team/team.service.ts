import {  Injectable, NotFoundException } from '@nestjs/common';
import {  CreateTeamParams } from './dto/create-team.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { EntityManager, Repository } from 'typeorm';
import { Resource } from 'src/resource/entities/resource.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TeamService {
  teamsService: any;
  teamData: any;

  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(Resource) private readonly resourceRepository: Repository<Resource>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectEntityManager() private entityManager: EntityManager) { }

  async getTeams(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  //method to get all teams
  // findTeams() {
  //   //get all the team records from the teams table
  //   return this.teamRepository.find({
  //     order: {
  //       createdAt: 'DESC'
  //     }
  //   });
  // }

  async findTeams() {
    return this.teamRepository.createQueryBuilder('team')
      .leftJoin('team.resources', 'resource')
      .select('team.teamId', 'teamId') // Keep selecting the team id
      .addSelect('team.team_Name', 'teamName') // Keep selecting the team name
      // Add selects for all other fields in the team entity. For example:
      .addSelect('team.team_description', 'teamDescription')
      .addSelect('team.createdAt', 'createdAt')
      // Add any other fields from the team entity here
      .addSelect('COUNT(resource.resourceId)', 'resourceCount') // Keep counting the number of resources
      .groupBy('team.teamId') // Keep the group by to ensure correct aggregation
      .orderBy('team.createdAt', 'DESC') // Keep the order by creation date
      .getRawMany(); // Keep getting raw results suitable for aggregated values
  }
  
  //method to create team by updating teamid column in resource table
  async createTeamAndAssignResources(createTeamParams: CreateTeamParams): Promise<Team | null> {
    const { teamName, team_description, resourceIds } = createTeamParams;

    // Check if any of the required parameters are null
    if (!teamName || !team_description || !resourceIds || resourceIds.length === 0) {
      // You can either return null or throw an error
      return null;
      // throw new Error('Invalid parameters');
    }

    // Map 'teamName' to 'team_Name'
    const team_Name = teamName;

    // Create a new team
    const team = this.teamRepository.create({ team_Name, team_description, createdBy: {user_id: createTeamParams.createdBy} as User });
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
        .where("teamId = :id", { id })
        .execute();

      if (result.affected === 0) {
        throw new NotFoundException(`Team with ID ${id} not found`);
      }
    });
  }



}
