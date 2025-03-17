import { Test, TestingModule } from '@nestjs/testing';
import { NichesService } from './niches.service';

describe('NichesService', () => {
  let service: NichesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NichesService],
    }).compile();

    service = module.get<NichesService>(NichesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
