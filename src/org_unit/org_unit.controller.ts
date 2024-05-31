import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { OrgUnitService } from './org_unit.service';
import { CreateOrgUnitDto } from './dto/create-org_unit.dto';
import { UpdateOrgUnitDto } from './dto/update-org_unit.dto';
import { relative } from 'path/win32';
import { OrgUnit } from './entities/org_unit.entity';

@Controller('org-unit')
export class OrgUnitController {
  constructor(private orgUnitService: OrgUnitService) {}

  @Post()
  createOrgUnit(@Body() createOrgUnitDto : CreateOrgUnitDto) {
    return this.orgUnitService.createOrgUnit(createOrgUnitDto);
  }

  @Get()
  async getOrgUnits() {
    return this.orgUnitService.findOrgUnits();
  }

  @Get(':unitId')
  async getUnitNameById(@Param('unitId') unitId: number) {
    return this.orgUnitService.getUnitNameById(unitId);
  }


  @Put(':unitId')
  async updateOrgUnitById(@Param('unitId', ParseIntPipe) unitId: number, @Body() updateOrgUnitDto: UpdateOrgUnitDto) {
    await this.orgUnitService.updateOrgUnit(unitId, updateOrgUnitDto);
  }


  @Delete(':unitId')
  async deleteOrgUnitById(@Param('unitId', ParseIntPipe) unitId: number) {
    await this.orgUnitService.deleteOrgUnit(unitId);
  }


  @Get('hierarchy/data')
  async getOrgUnitHierarchy(): Promise<any> {
    return this.orgUnitService.getOrgUnitHierarchy();
    // return "Hierarchy";
  }

  //To get ancestors
  // @Get(':unitId/ancestors')
  // async getAncestors(@Param('unitId', ParseIntPipe) unitId: number) {
  //   const ancestors = await this.orgUnitService.getAncestors(unitId);
  //   if (!ancestors || ancestors.length === 0) {
  //     return { message: 'No ancestors found' };
  //   }
  //   return ancestors;
  // }

  @Get(':unitId/ancestors')
  async getAncestors(@Param('unitId', ParseIntPipe) unitId: number): Promise<OrgUnit[]> {
    return this.orgUnitService.getAncestors(unitId);
  }
}
