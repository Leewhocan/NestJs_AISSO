import { Module } from '@nestjs/common';
import { NichesService } from './niches.service';
import { NichesController } from './niches.controller';

@Module({
    controllers: [NichesController],
    providers: [NichesService],
})
export class NichesModule {}
