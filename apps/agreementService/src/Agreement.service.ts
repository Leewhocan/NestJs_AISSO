import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, Country, STATUSES, AgreementStatus } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Payload } from '@nestjs/microservices';

import { TCancelSubAgreement, TCreateAgreement, TSubAgreement } from 'apps/lib/AgreementService/AgreementService.dto';
@Injectable()
export class AgreementService {
    constructor(private prisma: PrismaService) {}
    async createAgreement(createAgreementInfo: TCreateAgreement) {
        try {
            // Проверяем существование контракта
            const hasContract = await this.prisma.contract.findUnique({
                where: { id: createAgreementInfo.contractId },
            });
            if (!hasContract) {
                throw new NotFoundException('Contract not found');
            }

            const [agreement] = await this.prisma.$transaction([
                this.prisma.agreement.create({ data: { ...createAgreementInfo } }),
                this.prisma.contract.update({
                    where: { id: createAgreementInfo.contractId },
                    data: { status: STATUSES.INWAIT },
                }),
            ]);

            return { agreement };
        } catch (error) {
            throw new InternalServerErrorException('Failed to create agreement');
        }
    }
    async cancelAgreement(cancelAgreementDto: TCancelSubAgreement) {
        return this.prisma.$transaction(async (prisma) => {
            // 1. Проверяем существование контракта и прав доступа
            const contract = await prisma.contract.findUnique({
                where: { id: cancelAgreementDto.contractId },
                select: { id: true, status: true },
            });

            if (!contract) {
                throw new NotFoundException('Contract not found');
            }

            // 2. Удаляем соглашение
            await prisma.agreement.delete({
                where: { id: cancelAgreementDto.id },
            });

            // 3. Проверяем оставшиеся соглашения и обновляем статус контракта при необходимости
            const remainingAgreementsCount = await prisma.agreement.count({
                where: { contractId: cancelAgreementDto.contractId },
            });

            if (remainingAgreementsCount === 0 && contract.status !== STATUSES.CREATE) {
                await prisma.contract.update({
                    where: { id: cancelAgreementDto.contractId },
                    data: { status: STATUSES.CREATE },
                });
            }

            return { success: true, message: 'Agreement cancelled successfully' };
        });
    }
    async subAgreement(subAgreement: TSubAgreement) {
        return this.prisma.$transaction(async (prisma) => {
            // 1. Проверяем существование контракта
            const contract = await prisma.contract.findUnique({
                where: { id: subAgreement.contractId },
                select: { id: true, status: true },
            });

            if (!contract) {
                throw new NotFoundException('Contract not found');
            }

            // 2. Обновляем текущее соглашение на COMPLETED
            await prisma.agreement.update({
                where: { id: subAgreement.id },
                data: {
                    status: AgreementStatus.COMPLETED,
                },
            });

            // 3. Обновляем контракт на DONE
            const doneContract = await prisma.contract.update({
                where: { id: subAgreement.contractId },
                data: { status: STATUSES.DONE },
            });

            // 4. Все остальные соглашения этого контракта (кроме текущего) помечаем как REJECTED
            await prisma.agreement.updateMany({
                where: {
                    contractId: subAgreement.contractId,
                    id: { not: subAgreement.id }, // Все соглашения, кроме текущего
                    status: { not: AgreementStatus.REFECTED }, // Опционально: не обновлять уже отклоненные
                },
                data: {
                    status: AgreementStatus.REFECTED,
                },
            });

            return {
                success: true,
                message: 'Agreement completed and other agreements rejected successfully',
                data: { ...doneContract },
            };
        });
    }

    async getAll() {
        return this.prisma.agreement.findMany();
    }
}
