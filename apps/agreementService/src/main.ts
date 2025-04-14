import { NestFactory } from '@nestjs/core';
import { AgreementModule } from './Agreement.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AgreementModule, {
        transport: Transport.TCP,
        options: {
            host: 'localhost',
            port: 3328,
        },
    });
    await app.listen();
}
bootstrap();
