import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { OrgUnitService } from './org_unit.service';
import { CreateOrgUnitDto } from './dto/create-org_unit.dto';
import { UpdateOrgUnitDto } from './dto/update-org_unit.dto';

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrgUnitDto: UpdateOrgUnitDto) {
  //   return this.orgUnitService.update(+id, updateOrgUnitDto);
  // }

}
