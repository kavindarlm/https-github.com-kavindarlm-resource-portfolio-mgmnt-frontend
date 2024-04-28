import { Test, TestingModule } from '@nestjs/testing';
import { ResourceHolidayService } from './resource_holiday.service';

describe('ResourceHolidayService', () => {
  let service: ResourceHolidayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceHolidayService],
    }).compile();

    service = module.get<ResourceHolidayService>(ResourceHolidayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
