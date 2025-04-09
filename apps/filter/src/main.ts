import { NestFactory } from '@nestjs/core';
import { FilterModule } from './filter.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(FilterModule, {
        transport: Transport.TCP,
        options: {
            host: 'localhost',
            port: 3012,
        },
    });
    await app.listen();
}
bootstrap();
