import { Test, TestingModule } from '@nestjs/testing';
import { NichesController } from './niches.controller';
import { NichesService } from './niches.service';

describe('NichesController', () => {
    let controller: NichesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NichesController],
            providers: [NichesService],
        }).compile();

        controller = module.get<NichesController>(NichesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
