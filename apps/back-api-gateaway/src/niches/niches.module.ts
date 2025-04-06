import { Module } from '@nestjs/common';
import { NichesService } from './niches.service';
import { NichesController } from './niches.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'NICHES_CLIENT',
                transport: Transport.TCP,
                options: { host: 'localhost', port: 3002 },
            },
        ]),
        JwtModule.register({ global: true, secret: 'secret_lol', signOptions: { expiresIn: '12h' } }),
    ],
    controllers: [NichesController],
    providers: [NichesService],
})
export class NichesModule {}
