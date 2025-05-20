import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, Country, STATUSES } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Payload } from '@nestjs/microservices';
import { TcountryValue } from 'apps/lib/FilterService/FilterService.dto';
import {
    TCreateContract,
    TDeleteContract,
    TGetContractByAuthor,
    TUpdateContract,
} from 'apps/lib/ContractService/ContractService.dto';
@Injectable()
export class ContractService {
    constructor(private prisma: PrismaService) {}

    async createContracts(createContractInfo: TCreateContract) {
        console.log(createContractInfo);
        try {
            const contract = await this.prisma.contract.create({ data: { ...createContractInfo } });
            const bufferImage = Buffer.from(Object.values(contract.image)).toString('base64');
            return { ...contract, image: bufferImage };
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getLastConracts(page: number, ammount: number, tnved: string, country: string) {
        try {
            const whereConditions = {
                ...(tnved && { tnvedId: tnved }),
                ...(country && { countryId: country }),
            };

            const skip = (page - 1) * ammount;
            const total = await this.prisma.contract.count();
            const lastContracts = await this.prisma.contract.findMany({
                skip: skip,
                take: ammount,
                orderBy: {
                    createdAt: 'desc',
                },
                where: whereConditions,
            });
            const updateImageLastContracts = lastContracts.map((contract) => {
                const bufferImage = Buffer.from(Object.values(contract.image)).toString('base64');
                return { ...contract, image: bufferImage };
            });
            const meta = {
                total,
                page,
                totalPages: Math.ceil(total / ammount),
                ammount,
            };
            return { updateImageLastContracts, meta };
        } catch (error) {
            throw new Error(error);
        }
    }

    async getContractById(idContract: number) {
        try {
            const contract = await this.prisma.contract.findFirst({
                where: {
                    id: idContract,
                },
            });
            const bufferImage = Buffer.from(Object.values(contract.image)).toString('base64');
            return { ...contract, image: bufferImage };
        } catch (error) {
            throw new Error(error);
        }
    }
    async getByAuthor(contractByAuthorInfo: TGetContractByAuthor) {
        // console.log(contractByAuthorInfo);
        try {
            const lastContracts = await this.prisma.contract.findMany({
                where: {
                    authorId: contractByAuthorInfo.authorId,
                    status: contractByAuthorInfo.status,
                },
            });
            const updateImageLastContracts = lastContracts.map((contract) => {
                const bufferImage = Buffer.from(Object.values(contract.image)).toString('base64');
                return { ...contract, image: bufferImage };
            });
            return { updateImageLastContracts };
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async updateContract(updateContractData: TUpdateContract) {
        const existingContract = await this.prisma.contract.findUnique({
            where: { id: updateContractData.id },
            select: { authorId: true },
        });

        if (!existingContract) {
            throw new NotFoundException('Контракт не найден');
        }

        if (existingContract.authorId !== updateContractData.authorId) {
            throw new UnauthorizedException('Нельзя изменить чужой контракт');
        }

        const updatedContract = await this.prisma.contract.update({
            where: { id: updateContractData.id },
            data: updateContractData,
        });

        return {
            ...updatedContract,
            image: updatedContract.image ? Buffer.from(Object.values(updatedContract.image)).toString('base64') : null,
        };
    }
    async deleteContract(deleteContractData: TDeleteContract) {
        return this.prisma.$transaction(async (prisma) => {
            const existingContract = await prisma.contract.findUnique({
                where: { id: deleteContractData.id },
                select: { authorId: true },
            });

            if (!existingContract) throw new NotFoundException('Контракт не найден');
            if (existingContract.authorId !== deleteContractData.authorId) {
                throw new UnauthorizedException('Нельзя удалять чужой контракт');
            }

            await prisma.contract.delete({ where: { id: deleteContractData.id } });

            // Проверка внутри транзакции
            const exists = await prisma.contract.findUnique({
                where: { id: deleteContractData.id },
            });

            if (exists) throw new Error('Deletion verification failed');

            return { message: 'Контракт успешно удален' };
        });
    }
}
