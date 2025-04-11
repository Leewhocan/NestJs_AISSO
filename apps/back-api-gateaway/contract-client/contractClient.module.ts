import { Module } from '@nestjs/common';
import { ContractClientController } from './contractClient.controller';
import { ContractClientService } from './contractClient.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'CONTRACT_CLIENT',
                transport: Transport.TCP,
                options: { host: 'localhost', port: 3128 },
            },
        ]),
    ],
    providers: [ContractClientService],
    controllers: [ContractClientController],
})
export class ContractClientModule {}
