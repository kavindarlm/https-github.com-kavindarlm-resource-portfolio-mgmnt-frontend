import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Project } from 'src/project/entities/project.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'tapro-new.mysql.database.azure.com',
    port: 3306,
    username: 'tapro',
    password: '1234!@#$LK',
    database: 'database1',
    entities: [
        // __dirname + '/../**/*.entity{.ts,.js}',
        User,Post,Project,Task
    ],
    synchronize: true,
    ssl: true,
    extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
};