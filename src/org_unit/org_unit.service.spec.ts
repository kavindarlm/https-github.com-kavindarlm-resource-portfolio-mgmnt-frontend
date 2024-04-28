import { Test, TestingModule } from '@nestjs/testing';
import { OrgUnitService } from './org_unit.service';

describe('OrgUnitService', () => {
  let service: OrgUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgUnitService],
    }).compile();

    service = module.get<OrgUnitService>(OrgUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
