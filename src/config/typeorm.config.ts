import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root@123',
  database: 'demo',
  entities: [User,Post],
  synchronize: true,
  extra: {
      authPlugins: {
          mysql_native_password: 'mysql_native_password',
      },
  },
};