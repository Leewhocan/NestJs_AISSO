import { Test, TestingModule } from '@nestjs/testing';
import { BackApiGateawayController } from './back-api-gateaway.controller';
import { BackApiGateawayService } from './back-api-gateaway.service';

describe('BackApiGateawayController', () => {
    let backApiGateawayController: BackApiGateawayController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [BackApiGateawayController],
            providers: [BackApiGateawayService],
        }).compile();

        backApiGateawayController = app.get<BackApiGateawayController>(BackApiGateawayController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(backApiGateawayController.getHello()).toBe('Hello World!');
        });
    });
});
