import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JobRole } from 'src/job_role/entities/job_role.entity';
import { OrgUnit } from 'src/org_unit/entities/org_unit.entity';
import { Resource } from 'src/resource/entities/resource.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'tapro-new.mysql.database.azure.com',
    port: 3306,
    username: 'tapro',
    password: '1234!@#$LK',
    database: 'database1',
    entities: [
        // __dirname + '/../**/*.entity{.ts,.js}',
        Resource, JobRole, OrgUnit
    ],
    synchronize: true,
    ssl: true,
    extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
};