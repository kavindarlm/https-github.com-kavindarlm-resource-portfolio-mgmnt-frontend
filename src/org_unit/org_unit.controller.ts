import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OrgUnitService } from './org_unit.service';
import { CreateOrgUnitDto } from './dto/create-org_unit.dto';
import { UpdateOrgUnitDto } from './dto/update-org_unit.dto';
import { relative } from 'path/win32';
import { OrgUnit } from './entities/org_unit.entity';

@Controller('org-unit')
export class OrgUnitController {
  constructor(private orgUnitService: OrgUnitService) { }

  @Post()
  createOrgUnit(@Body() createOrgUnitDto: CreateOrgUnitDto) {
    return this.orgUnitService.createOrgUnit(createOrgUnitDto);
  }

  @Get()
  async getOrgUnits() {
    return this.orgUnitService.findOrgUnits();
  }

  @Get(':unitId')
  async getUnitById(@Param('unitId') unitId: number) {
    return this.orgUnitService.getUnitById(unitId);
  }

  @Put(':unitId')
  async updateOrgUnitById(
    @Param('unitId', ParseIntPipe) unitId: number,
    @Body() updateOrgUnitDto: UpdateOrgUnitDto,
  ) {
    await this.orgUnitService.updateOrgUnit(unitId, updateOrgUnitDto);
  }

  @Delete(':unitId')
  async deleteOrgUnitById(@Param('unitId', ParseIntPipe) unitId: number) {
    const hasChildren = await this.orgUnitService.hasChildUnits(unitId);
    if (hasChildren) {
      throw new BadRequestException("If you want to delete this unit, you should edit or delete its child units first.");
    }
    const result = await this.orgUnitService.deleteOrgUnit(unitId);
    if (result.affected === 0) {
      throw new NotFoundException("Unit not found or already deleted.");
    }
    return { message: 'Unit deleted successfully.' };
  }


  @Get(':unitId/has-children')
  async hasChildUnits(@Param('unitId', ParseIntPipe) unitId: number) {
    const hasChildren = await this.orgUnitService.hasChildUnits(unitId);
    return hasChildren;
  }


  @Get('hierarchy/data')
  async getOrgUnitHierarchy(): Promise<any> {
    return this.orgUnitService.getOrgUnitHierarchy();
    // return "Hierarchy";
  }

  @Get('ancestors/parents/:unitId')
  async getAncestors(
    @Param('unitId', ParseIntPipe) unitId: number,
  ): Promise<OrgUnit[]> {
    return this.orgUnitService.getAncestors(unitId);
  }

  @Get('parent/:id')
  async getParentDetails(@Param('id') id: number) {
    return this.orgUnitService.getParentDetailsRecursive(id);
  }
}
