import { Test, TestingModule } from '@nestjs/testing';
import { ResourceAllocationController } from './resource_allocation.controller';
import { ResourceAllocationService } from './resource_allocation.service';

describe('ResourceAllocationController', () => {
  let controller: ResourceAllocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceAllocationController],
      providers: [ResourceAllocationService],
    }).compile();

    controller = module.get<ResourceAllocationController>(ResourceAllocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
