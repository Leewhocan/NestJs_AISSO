import { NestFactory } from '@nestjs/core';
import { ContractModule } from './Contract.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ContractModule, {
        transport: Transport.TCP,
        options: {
            host: 'localhost',
            port: 3128,
        },
    });
    await app.listen();
}
bootstrap();
