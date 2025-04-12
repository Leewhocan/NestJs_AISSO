import { Controller, Get, Post, Body, UseGuards, Query, UseInterceptors, Put, Delete } from '@nestjs/common';
import { ContractClientService } from './contractClient.service';
import { AuthGuard } from '../../guards/AuthGuard';
import {
    TCreateContract,
    TDeleteContract,
    TGetContractByAuthor,
    TUpdateContract,
} from 'apps/lib/ContractService/ContractService.dto';
import { addAuthorInterceptor } from 'apps/interceptors/AddAuthorInterceptor';

@Controller('contracts')
export class ContractClientController {
    constructor(private readonly contractClientService: ContractClientService) {}
    @UseGuards(AuthGuard)
    @UseInterceptors(addAuthorInterceptor)
    @Post()
    createContract(@Body() createContractInfo: TCreateContract) {
        console.log(createContractInfo);
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
    @Get('one')
    getContractById(@Query('contractId') contractId: string) {
        return this.contractClientService.getContractById(contractId);
    }
    @Put()
    @UseGuards(AuthGuard)
    @UseInterceptors(addAuthorInterceptor)
    updateContract(@Body() upddateContractInfo: TUpdateContract) {
        return this.contractClientService.updateContract(upddateContractInfo);
    }
    @Delete()
    @UseGuards(AuthGuard)
    @UseInterceptors(addAuthorInterceptor)
    deleteContract(@Body() deletedContract: TDeleteContract) {
        return this.contractClientService.deleteContract(deletedContract);
    }

    @Get('auth')
    @UseGuards(AuthGuard)
    @UseInterceptors(addAuthorInterceptor)
    getByAuthor(@Body() contractByAuthorInfo: TGetContractByAuthor) {
        return this.contractClientService.getContractByAuthor(contractByAuthorInfo);
    }
}
