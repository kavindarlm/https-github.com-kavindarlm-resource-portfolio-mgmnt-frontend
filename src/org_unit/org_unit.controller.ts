import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { OrgUnitService } from './org_unit.service';
import { CreateOrgUnitDto } from './dto/create-org_unit.dto';
import { UpdateOrgUnitDto } from './dto/update-org_unit.dto';
import { OrgUnit } from './entities/org_unit.entity';
import { JwtAuthGuard } from 'src/Auth/jwtauthGuard';
import { GetUser } from 'src/Auth/get-user.decorator';

@Controller('org-unit')
@UseGuards(JwtAuthGuard)
export class OrgUnitController {
  constructor(private orgUnitService: OrgUnitService) { }

  //create org unit
  @Post()
  createOrgUnit(@Body() createOrgUnitDto: CreateOrgUnitDto, @GetUser() user: any) {
    createOrgUnitDto.createdBy = user.id;
    return this.orgUnitService.createOrgUnit(createOrgUnitDto);
  }

  //get org units
  @Get()
  async getOrgUnits() {
    return this.orgUnitService.findOrgUnits();
  }

  //get org units by id
  @Get(':unitId')
  async getUnitById(@Param('unitId') unitId: number) {
    return this.orgUnitService.getUnitById(unitId);
  }

  //update org unit
  @Put(':unitId')
  async updateOrgUnitById(
    @Param('unitId', ParseIntPipe) unitId: number,
    @Body() updateOrgUnitDto: UpdateOrgUnitDto,
    @GetUser() user: any,
  ) {
    updateOrgUnitDto.updatedBy = user.id;
    await this.orgUnitService.updateOrgUnit(unitId, updateOrgUnitDto);
  }

  //delete org unit
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


  //to check if the org unit has child units
  @Get(':unitId/has-children')
  async hasChildUnits(@Param('unitId', ParseIntPipe) unitId: number) {
    const hasChildren = await this.orgUnitService.hasChildUnits(unitId);
    return hasChildren;
  }

  //to get org unit hierarchy
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

  //to get the parent units recursively
  @Get('parent/:id')
  async getParentDetails(@Param('id') id: number) {
    return this.orgUnitService.getParentDetailsRecursive(id);
  }
}
