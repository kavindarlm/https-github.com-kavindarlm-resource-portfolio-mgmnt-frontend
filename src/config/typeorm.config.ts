import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Task } from 'src/task/entities/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'tapro-new.mysql.database.azure.com',
    port: 3306,
    username: 'tapro',
    password: '1234!@#$LK',
    database: 'database1',
    entities: [
        // __dirname + '/../**/*.entity{.ts,.js}',
        Project,Task
    ],
    synchronize: true,
    ssl: true,
    extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
};