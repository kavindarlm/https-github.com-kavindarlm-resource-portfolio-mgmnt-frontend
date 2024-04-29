import { Test, TestingModule } from '@nestjs/testing';
import { CriticalityController } from './criticality.controller';
import { CriticalityService } from './criticality.service';

describe('CriticalityController', () => {
  let controller: CriticalityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriticalityController],
      providers: [CriticalityService],
    }).compile();

    controller = module.get<CriticalityController>(CriticalityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
