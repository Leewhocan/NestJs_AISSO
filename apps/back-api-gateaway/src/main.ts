import { NestFactory } from '@nestjs/core';
import { BackApiGateawayModule } from './back-api-gateaway.module';
import { json, urlencoded } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(BackApiGateawayModule);
    app.useStaticAssets('/shared/uploads', {
        prefix: '/uploads/',
    });
    app.enableCors();
    await app.listen(process.env.port ?? 3000);
}
bootstrap();
