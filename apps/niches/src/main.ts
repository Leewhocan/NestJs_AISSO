import { NestFactory } from '@nestjs/core';
import { NichesAppModule } from './niches-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(NichesAppModule, {
        transport: Transport.TCP,
        options: {
            host: 'niches',
            port: 3002,
        },
    });
    await app.listen();
}
bootstrap();
