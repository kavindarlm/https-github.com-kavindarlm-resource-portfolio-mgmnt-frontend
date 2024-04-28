import { Test, TestingModule } from '@nestjs/testing';
import { ResourceHolidayController } from './resource_holiday.controller';
import { ResourceHolidayService } from './resource_holiday.service';

describe('ResourceHolidayController', () => {
  let controller: ResourceHolidayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceHolidayController],
      providers: [ResourceHolidayService],
    }).compile();

    controller = module.get<ResourceHolidayController>(ResourceHolidayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
