import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
        transport: Transport.TCP,
        options: {
            host: 'user',
            port: 3005,
        },
    });
    await app.listen();
}
bootstrap();
