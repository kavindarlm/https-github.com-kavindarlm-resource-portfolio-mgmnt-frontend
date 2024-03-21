import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { SprintModule } from './Sprint_Mgt/sprint.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, PostModule ,SprintModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
