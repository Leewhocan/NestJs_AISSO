import { Module } from '@nestjs/common';
import { AgreementController } from './Agreement.controller';
import { AgreementService } from './Agreement.service';
import { PrismaService } from './prisma.service';

@Module({
    controllers: [AgreementController],
    providers: [AgreementService, PrismaService],
})
export class AgreementModule {}
