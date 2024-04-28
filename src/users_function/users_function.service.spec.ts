import { Test, TestingModule } from '@nestjs/testing';
import { UsersFunctionService } from './users_function.service';

describe('UsersFunctionService', () => {
  let service: UsersFunctionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersFunctionService],
    }).compile();

    service = module.get<UsersFunctionService>(UsersFunctionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
