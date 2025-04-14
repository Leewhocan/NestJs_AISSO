import { Module } from '@nestjs/common';
import { BackApiGateawayController } from './back-api-gateaway.controller';
import { BackApiGateawayService } from './back-api-gateaway.service';
import { UserClientModule } from '../user-client/userClient.module';
import { NichesClientModule } from '../niches-client/niches.module';
import { FilterClientModule } from '../filter-client/filterClient.module';
import { ContractClientModule } from '../contract-client/contractClient.module';
import { AgreementClientModule } from '../agreement-client/contractClient.module';
@Module({
    imports: [UserClientModule, NichesClientModule, FilterClientModule, ContractClientModule, AgreementClientModule],
    controllers: [BackApiGateawayController],
    providers: [BackApiGateawayService],
})
export class BackApiGateawayModule {}
