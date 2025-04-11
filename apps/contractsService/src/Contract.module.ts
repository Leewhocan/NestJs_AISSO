import { Module } from '@nestjs/common';
import { ContractController } from './Contract.controller';
import { ContractService } from './Contract.service';
import { PrismaService } from './prisma.service';

@Module({
    controllers: [ContractController],
    providers: [ContractService, PrismaService],
})
export class ContractModule {}
