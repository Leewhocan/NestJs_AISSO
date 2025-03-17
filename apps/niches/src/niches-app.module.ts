import { Module } from '@nestjs/common';
import { NichesModule } from './niches/niches.module';

@Module({
    imports: [NichesModule],
    controllers: [],
    providers: [],
})
export class NichesAppModule {}
