import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, Country } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Payload } from '@nestjs/microservices';
import { TcountryValue } from 'apps/lib/FilterService/FilterService.dto';
import { TCreateContract } from 'apps/lib/ContractService/ContractService.dto';
import { totalmem } from 'os';
@Injectable()
export class ContractService {
    constructor(private prisma: PrismaService) {}

    async createContracts(createContractInfo: TCreateContract) {
        try {
            const contract = await this.prisma.contract.create({ data: { ...createContractInfo } });
            const bufferImage = Buffer.from(Object.values(contract.image)).toString('base64');
            return { ...contract, image: bufferImage };
        } catch (error) {
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
}
