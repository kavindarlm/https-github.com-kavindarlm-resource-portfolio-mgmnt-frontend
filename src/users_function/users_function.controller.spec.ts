import { Test, TestingModule } from '@nestjs/testing';
import { UsersFunctionController } from './users_function.controller';
import { UsersFunctionService } from './users_function.service';

describe('UsersFunctionController', () => {
  let controller: UsersFunctionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersFunctionController],
      providers: [UsersFunctionService],
    }).compile();

    controller = module.get<UsersFunctionController>(UsersFunctionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
