import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Prisma, Country, STATUSES, AgreementStatus } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Payload } from '@nestjs/microservices';

import {
    TCancelSubAgreement,
    TCreateAgreement,
    TGetByAuthor,
    TGetByContract,
    TSubAgreement,
} from 'apps/lib/AgreementService/AgreementService.dto';
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
            const hasAgreementFromAuthor = await this.prisma.agreement.findFirst({
                where: { authorId: createAgreementInfo.authorId, contractId: createAgreementInfo.contractId },
            });
            if (hasAgreementFromAuthor) {
                throw new NotFoundException('Already done Agreement');
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
            console.log(error);
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

    async getByContract(getAgreementByContract: TGetByContract) {
        try {
            return this.prisma.$transaction(async (prisma) => {
                const contract = await prisma.contract.findUnique({
                    where: { id: getAgreementByContract.contractId, authorId: getAgreementByContract.authorId },
                    select: { id: true, status: true },
                });

                const agreementsonContract = await prisma.agreement.findMany({
                    where: {
                        contractId: contract.id,
                    },
                    include: {
                        exporter: {
                            select: {
                                name: true,
                            },
                        },
                    },
                });

                return agreementsonContract;
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to Get');
        }
    }
    async getByAuthor(getAgreementByAuthor: TGetByAuthor) {
        console.log(getAgreementByAuthor);
        try {
            return this.prisma.$transaction(async (prisma) => {
                // Если указан contractId - возвращаем одно соглашение по контракту
                if (getAgreementByAuthor.contractId) {
                    const agreement = await prisma.agreement.findFirst({
                        where: {
                            contractId: getAgreementByAuthor.contractId,
                            authorId: getAgreementByAuthor.authorId,
                        },
                    });

                    if (!agreement) {
                        throw new NotFoundException('Agreement not found for this contract');
                    }

                    return [agreement]; // Возвращаем массив с одним элементом для единообразия
                }

                // Если contractId нет, проверяем наличие статуса
                if (!getAgreementByAuthor.status) {
                    throw new BadRequestException('Status is required when contractId is not provided');
                }

                // Ищем все соглашения по автору и статусу
                return prisma.agreement.findMany({
                    where: {
                        authorId: getAgreementByAuthor.authorId,
                        status: getAgreementByAuthor.status,
                    },
                });
            });
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get agreements');
        }
    }
}
