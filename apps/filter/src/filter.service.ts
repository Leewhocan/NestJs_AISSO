import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, Country } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Payload } from '@nestjs/microservices';
import { TcountryValue } from 'apps/lib/FilterService/FilterService.dto';
@Injectable()
export class FilterService {
    constructor(private prisma: PrismaService) {}

    async getCountry(@Payload() countryValue: TcountryValue) {
        console.log(countryValue);
        try {
            if (countryValue) {
                const country = await this.prisma.country.findUnique({
                    where: {
                        value: countryValue,
                    },
                });
                return country;
            }
            const country = await this.prisma.country.findMany();
            return country;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Ошибка сервиса');
        }
    }

    async getTNVED() {
        const goods = await this.prisma.tnved.findMany();
        return goods;
    }
}
