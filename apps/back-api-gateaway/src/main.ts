import { NestFactory } from '@nestjs/core';
import { BackApiGateawayModule } from './back-api-gateaway.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(BackApiGateawayModule);
    app.use(json({ limit: '50mb' }));

    // Увеличиваем лимит для URL-encoded данных (например, до 50MB)
    app.use(urlencoded({ limit: '50mb', extended: true }));
    app.enableCors();
    await app.listen(process.env.port ?? 3000);
}
bootstrap();
