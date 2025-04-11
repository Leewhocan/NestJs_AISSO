import { Controller } from '@nestjs/common';
import { ContractService } from './Contract.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { TcountryValue } from 'apps/lib/FilterService/FilterService.dto';
import { TCreateContract } from 'apps/lib/ContractService/ContractService.dto';

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
    // @MessagePattern('filter.getTnved')
    // async getTnved() {
    //     return this.filterService.getTNVED();
    // }
}
