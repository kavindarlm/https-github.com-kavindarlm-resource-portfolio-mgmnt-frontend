import { Module } from '@nestjs/common';
import { OrgUnitService } from './org_unit.service';
import { OrgUnitController } from './org_unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgUnit } from './entities/org_unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrgUnit])],//array of entities that you want to use in the module
  controllers: [OrgUnitController],
  providers: [OrgUnitService]
})
export class OrgUnitModule {}
