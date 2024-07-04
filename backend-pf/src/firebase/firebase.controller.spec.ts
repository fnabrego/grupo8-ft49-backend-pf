import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseController } from './firebase.controller';

describe('FirebaseController', () => {
  let controller: FirebaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirebaseController],
    }).compile();

    controller = module.get<FirebaseController>(FirebaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
