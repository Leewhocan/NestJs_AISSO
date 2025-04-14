import { Module } from '@nestjs/common';
import { AgreementClientController } from './agreementClient.controller';
import { AgreementClientService } from './agreementClient.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AGREEMENT_CLIENT',
                transport: Transport.TCP,
                options: { host: 'localhost', port: 3328 },
            },
        ]),
    ],
    providers: [AgreementClientService],
    controllers: [AgreementClientController],
})
export class AgreementClientModule {}
