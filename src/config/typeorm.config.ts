import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Holiday } from 'src/holiday/entities/holiday.entity';
import { ResourceHoliday } from 'src/resource_holiday/entities/resource_holiday.entity';
import { Team } from 'src/team/entities/team.entity';

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
        ResourceHoliday

    ],
    synchronize: true,
    ssl: true,
    extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
};