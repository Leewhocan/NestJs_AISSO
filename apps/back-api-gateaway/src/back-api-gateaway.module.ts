import { Module } from '@nestjs/common';
import { BackApiGateawayController } from './back-api-gateaway.controller';
import { BackApiGateawayService } from './back-api-gateaway.service';
import { UserModule } from '../user-client/userClient.module';
import { NichesModule } from '../niches-client/niches.module';

@Module({
    imports: [UserModule, NichesModule],
    controllers: [BackApiGateawayController],
    providers: [BackApiGateawayService],
})
export class BackApiGateawayModule {}
