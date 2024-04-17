import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Function } from 'src/functions/entities/function.entity';
import { UsersFunction } from 'src/users_function/entities/users_function.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'tapro-new.mysql.database.azure.com',
    port: 3306,
    username: 'tapro',
    password: '1234!@#$LK',
    database: 'database1',
    entities: [
        // __dirname + '/../**/*.entity{.ts,.js}',
        User,
        // Project,
        // Task,
        Function,
        UsersFunction
    ],
    synchronize: true,
    ssl: true,
    extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
};