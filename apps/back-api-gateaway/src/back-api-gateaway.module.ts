import { Module } from '@nestjs/common';
import { BackApiGateawayController } from './back-api-gateaway.controller';
import { BackApiGateawayService } from './back-api-gateaway.service';
import { UserClientModule } from '../user-client/userClient.module';
import { NichesClientModule } from '../niches-client/niches.module';
import { FilterClientModule } from '../filter-client/filterClient.module';
import { ContractClientModule } from '../contract-client/contractClient.module';
@Module({
    imports: [UserClientModule, NichesClientModule, FilterClientModule, ContractClientModule],
    controllers: [BackApiGateawayController],
    providers: [BackApiGateawayService],
})
export class BackApiGateawayModule {}
