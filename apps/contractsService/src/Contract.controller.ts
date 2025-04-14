import { Controller } from '@nestjs/common';
import { ContractService } from './Contract.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { TcountryValue } from 'apps/lib/FilterService/FilterService.dto';
import {
    TCreateContract,
    TDeleteContract,
    TGetContractByAuthor,
    TUpdateContract,
} from 'apps/lib/ContractService/ContractService.dto';

@Controller()
export class ContractController {
    constructor(private readonly ContractService: ContractService) {}

    @MessagePattern('contracts.createContract')
    async createContracts(createContractInfo: TCreateContract) {
        return this.ContractService.createContracts(createContractInfo);
    }
    @MessagePattern('contracts.getContracts')
    async getLastContracts(params) {
        const page = params.page;
        const ammount = params.amount;
        const tnved = params.tnved;
        const country = params.country;
        return this.ContractService.getLastConracts(page, ammount, tnved, country);
    }
    @MessagePattern('contracts.getById')
    async getById(id: number) {
        console.log(id);
        return this.ContractService.getContractById(id);
    }
    @MessagePattern('contract.update')
    async updateContract(updateContractInfo: TUpdateContract) {
        return this.ContractService.updateContract(updateContractInfo);
    }
    @MessagePattern('contract.delete')
    async deleteContract(deleteContractInfo: TDeleteContract) {
        return this.ContractService.deleteContract(deleteContractInfo);
    }

    @MessagePattern('contract.getByAuthor')
    async getByAuthor(contractByAuthorInfo: TGetContractByAuthor) {
        return this.ContractService.getByAuthor(contractByAuthorInfo);
    }
    // @MessagePattern('filter.getTnved')
    // async getTnved() {
    //     return this.filterService.getTNVED();
    // }
}
