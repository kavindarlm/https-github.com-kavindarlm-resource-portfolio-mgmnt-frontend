import { Module } from '@nestjs/common';
import { CriticalityService } from './criticality.service';
import { CriticalityController } from './criticality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Criticality } from './entities/criticality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Criticality])],
  controllers: [CriticalityController],
  providers: [CriticalityService]
})
export class CriticalityModule {
  
}
