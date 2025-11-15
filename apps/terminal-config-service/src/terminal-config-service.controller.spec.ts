import { Test, TestingModule } from '@nestjs/testing';
import { TerminalConfigServiceController } from './terminal-config-service.controller';
import { TerminalConfigServiceService } from './terminal-config-service.service';

describe('TerminalConfigServiceController', () => {
  let terminalConfigServiceController: TerminalConfigServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TerminalConfigServiceController],
      providers: [TerminalConfigServiceService],
    }).compile();

    terminalConfigServiceController = app.get<TerminalConfigServiceController>(
      TerminalConfigServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(terminalConfigServiceController.getHello()).toBe('Hello World!');
    });
  });
});
