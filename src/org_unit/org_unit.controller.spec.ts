import { Test, TestingModule } from '@nestjs/testing';
import { OrgUnitController } from './org_unit.controller';
import { OrgUnitService } from './org_unit.service';

describe('OrgUnitController', () => {
  let controller: OrgUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgUnitController],
      providers: [OrgUnitService],
    }).compile();

    controller = module.get<OrgUnitController>(OrgUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
