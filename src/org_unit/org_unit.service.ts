import { Injectable } from '@nestjs/common';
import { CreateOrgUnitDto, CreateOrgUnitParams } from './dto/create-org_unit.dto';
import { UpdateOrgUnitDto, UpdateOrgUnitParams } from './dto/update-org_unit.dto';
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


  // create(createOrgUnitDto: CreateOrgUnitDto) {
  //   return 'This action adds a new orgUnit';
  // }

  // findAll() {
  //   return `This action returns all orgUnit`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} orgUnit`;
  // }

  // update(id: number, updateOrgUnitDto: UpdateOrgUnitDto) {
  //   return `This action updates a #${id} orgUnit`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} orgUnit`;
  // }
}
