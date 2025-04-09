import { Module } from '@nestjs/common';
import { FilterClientService } from './filterClient.service';
import { FilterClientController } from './filterClient.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'FILTER_CLIENT',
                transport: Transport.TCP,
                options: { host: 'localhost', port: 3012 },
            },
        ]),
    ],
    providers: [FilterClientService],
    controllers: [FilterClientController],
})
export class FilterClientModule {}
