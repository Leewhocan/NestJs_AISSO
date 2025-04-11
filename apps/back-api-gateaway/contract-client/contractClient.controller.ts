import { Controller, Get, Post, Body, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { ContractClientService } from './contractClient.service';
import { AuthGuard } from '../../guards/AuthGuard';
import { TCreateContract } from 'apps/lib/ContractService/ContractService.dto';
import { addAuthorInterceptor } from 'apps/interceptors/AddAuthorInterceptor';

@Controller('contracts')
export class ContractClientController {
    constructor(private readonly contractClientService: ContractClientService) {}
    @UseGuards(AuthGuard)
    @UseInterceptors(addAuthorInterceptor)
    @Post()
    createContract(@Body() createContractInfo: TCreateContract) {
        return this.contractClientService.createContract(createContractInfo);
    }
    @Get()
    getLastContracts(
        @Query('page') page: string,
        @Query('ammount') ammount: string,
        @Query('tnved') tnved: string,
        @Query('country') country: string,
    ) {
        return this.contractClientService.getLastContracts(page, ammount, tnved, country);
    }
}
