import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
        transport: Transport.TCP,
        options: {
            host: 'localhost',
            port: 3010,
        },
    });
    await app.listen();
}
bootstrap();
