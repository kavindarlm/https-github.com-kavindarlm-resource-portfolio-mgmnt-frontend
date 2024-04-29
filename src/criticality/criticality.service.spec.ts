import { Test, TestingModule } from '@nestjs/testing';
import { CriticalityService } from './criticality.service';

describe('CriticalityService', () => {
  let service: CriticalityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriticalityService],
    }).compile();

    service = module.get<CriticalityService>(CriticalityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
