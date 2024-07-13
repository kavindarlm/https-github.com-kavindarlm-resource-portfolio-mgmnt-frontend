import { Injectable } from '@nestjs/common';
import { CreateOrgUnitParams } from './dto/create-org_unit.dto';
import { UpdateOrgUnitParams } from './dto/update-org_unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgUnit } from './entities/org_unit.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class OrgUnitService {
  constructor(
    @InjectRepository(OrgUnit) private orgUnitRepository: Repository<OrgUnit>,
  ) { }

  findOrgUnits() {
    return this.orgUnitRepository.find();
  }

  //create org unit
  createOrgUnit(orgUnitDetails: CreateOrgUnitParams) {
    //create method is not asynchronous so don't have to await it
    const newOrgUnit = this.orgUnitRepository.create({
      ...orgUnitDetails,
      createdAt: new Date(), createdBy: { user_id: orgUnitDetails.createdBy } as User
    });
    return this.orgUnitRepository.save(newOrgUnit);
  }

  //update org unit
  updateOrgUnit(unitId: number, updateOrgUnitDetails: UpdateOrgUnitParams) {
    return this.orgUnitRepository.update(
      { unitId },
      { ...updateOrgUnitDetails, updatedBy: { user_id: updateOrgUnitDetails.updatedBy } as User },
    );
  }

  //to check if the unit has child units
  async hasChildUnits(unitId: number): Promise<boolean> {
    const childUnits = await this.orgUnitRepository.find({
      where: { parentId: unitId },
    });
    return childUnits.length > 0;
  }

  //delete org unit
  deleteOrgUnit(unitId: number) {
    return this.orgUnitRepository.delete({ unitId });
  }

  //to get org unit by id
  async getUnitById(unitId: number): Promise<OrgUnit | undefined> {
    return this.orgUnitRepository.findOne({
      where: { unitId },
      relations: ['parent'],
    });
  }

  //get org unit name by id
  async getUnitNameById(unitId: number): Promise<string | undefined> {
    const orgUnit = await this.orgUnitRepository.findOne({ where: { unitId } });
    return orgUnit ? orgUnit.unitName : '';
  }

  //get org unit hierarchy
  async getOrgUnitHierarchy(): Promise<any> {
    const orgUnits = await this.orgUnitRepository.find();
    const hierarchy = this.buildHierarchy(orgUnits, null);
    return hierarchy.length > 0 ? hierarchy[0] : null; // Return the first element if the hierarchy is not empty, otherwise return null
  }

  //build org unit hierarchy
  private buildHierarchy(orgUnits: OrgUnit[], parentId: number | null): any {
    const result: any[] = [];
    orgUnits.forEach((unit) => {
      if (unit.parentId === parentId) {
        const children = this.buildHierarchy(orgUnits, unit.unitId);
        result.push({
          unitName: unit.unitName,
          unitId: unit.unitId,
          parentId: unit.parentId,
          description: unit.description,
          children: children,
        });
      }
    });
    return result;
  }

  //get ancestors of the org unit
  async getAncestors(unitId: number): Promise<OrgUnit[]> {
    const ancestors: OrgUnit[] = [];
    let currentUnit = await this.orgUnitRepository.findOne({
      where: { unitId },
      relations: ['parent'],
    });

    while (currentUnit && currentUnit.parent) {
      ancestors.unshift(currentUnit.parent);
      currentUnit = await this.orgUnitRepository.findOne({
        where: { unitId: currentUnit.parent.unitId },
        relations: ['parent'],
      });
    }

    return ancestors;
  }

  //get parent units recursively
  async getParentDetailsRecursive(orgUnitId: number): Promise<OrgUnit[]> {
    const result = [];

    let currentOrgUnit = await this.orgUnitRepository.findOne({
      where: { unitId: orgUnitId },
    });

    while (currentOrgUnit) {
      result.push(currentOrgUnit);
      if (!currentOrgUnit.parentId) break;

      currentOrgUnit = await this.orgUnitRepository.findOne({
        where: { unitId: currentOrgUnit.parentId },
      });
    }
    return result;
  }
}
