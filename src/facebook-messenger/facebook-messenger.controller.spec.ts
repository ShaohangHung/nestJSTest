import { Test, TestingModule } from '@nestjs/testing';
import { FacebookMessengerController } from './facebook-messenger.controller';

describe('FacebookMessengerController', () => {
  let controller: FacebookMessengerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacebookMessengerController],
    }).compile();

    controller = module.get<FacebookMessengerController>(FacebookMessengerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
