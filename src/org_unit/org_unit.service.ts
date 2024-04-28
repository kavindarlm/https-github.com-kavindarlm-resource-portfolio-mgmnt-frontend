import { Injectable } from '@nestjs/common';
import { CreateOrgUnitParams } from './dto/create-org_unit.dto';
import { UpdateOrgUnitParams } from './dto/update-org_unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgUnit } from './entities/org_unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrgUnitService {

  constructor(@InjectRepository(OrgUnit) private orgUnitRepository: Repository<OrgUnit>) {}

  findOrgUnits() {
    return this.orgUnitRepository.find();
  }

  createOrgUnit(orgUnitDetails: CreateOrgUnitParams) {
    //create method is not asynchronous so don't have to await it
    const newOrgUnit = this.orgUnitRepository.create({...orgUnitDetails, createdAt: new Date()});
    return this.orgUnitRepository.save(newOrgUnit);
  }

  updateOrgUnit(unitId: number, updateOrgUnitDetails:UpdateOrgUnitParams) {
    return this.orgUnitRepository.update({unitId}, {...updateOrgUnitDetails});
  }

  deleteOrgUnit(unitId: number) {
    return this.orgUnitRepository.delete({unitId});
  }


  async getUnitNameById(unitId: number): Promise<string | undefined> {
    const orgUnit = await this.orgUnitRepository.findOne({ where: { unitId } });
    return orgUnit? orgUnit.unitName: '';
  }

  async getOrgUnitHierarchy(): Promise<any> {
    const orgUnits = await this.orgUnitRepository.find();
    const hierarchy = this.buildHierarchy(orgUnits, null);
    return hierarchy.length > 0 ? hierarchy[0] : null; // Return the first element if the hierarchy is not empty, otherwise return null
  }
  

  private buildHierarchy(orgUnits: OrgUnit[], parentId: number | null): any {
    const result: any[] = [];
    orgUnits.forEach(unit => {
      if (unit.parentId === parentId) {
        const children = this.buildHierarchy(orgUnits, unit.unitId);
        result.push({
          unitName: unit.unitName,
          unitId: unit.unitId,
          parentId: unit.parentId,
          description: unit.description,
          children: children
        });
      }
    });
    return result;
  }
}
