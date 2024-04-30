import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Holiday } from 'src/holiday/entities/holiday.entity';
import { ResourceHoliday } from 'src/resource_holiday/entities/resource_holiday.entity';
import { Team } from 'src/team/entities/team.entity';
import { JobRole } from 'src/job_role/entities/job_role.entity';
import { OrgUnit } from 'src/org_unit/entities/org_unit.entity';
import { Resource } from 'src/resource/entities/resource.entity';
import { Project } from 'src/project/entities/project.entity';
import { Task } from 'src/task/entities/task.entity'; // import task entity
import { User } from 'src/user/entities/user.entity';
import { Function } from 'src/functions/entities/function.entity';
import { UsersFunction } from 'src/users_function/entities/users_function.entity';
import { Criticality } from 'src/criticality/entities/criticality.entity';
import { Sprint } from 'src/sprint/entities/sprint.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'tapro-new.mysql.database.azure.com',
    port: 3306,
    username: 'tapro',
    password: '1234!@#$LK',
    database: 'database1',
    entities: [
        // __dirname + '/../**/*.entity{.ts,.js}',
        Team,
        Holiday,
        ResourceHoliday,
        Resource, 
        JobRole, 
        OrgUnit,
        Project,
        Task,
        User,
        Function,
        UsersFunction,
        Criticality,
        Sprint
    ],
    synchronize: true,
    ssl: true,
    extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
};