import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Sprint } from 'src/Sprint_Mgt/sprint.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';



    export const typeOrmConfig: TypeOrmModuleOptions = {
      // ... other configurations
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root@123',
      database: 'tapro',
      entities: [Sprint],
      synchronize: true,
      extra: {
          authPlugins: {
              mysql_native_password: 'mysql_native_password',
          },
      },
  
  
  
  
};