import { NestFactory } from '@nestjs/core';
import { BackApiGateawayModule } from './back-api-gateaway.module';

async function bootstrap() {
    const app = await NestFactory.create(BackApiGateawayModule);
    await app.listen(process.env.port ?? 3000);
}
bootstrap();
