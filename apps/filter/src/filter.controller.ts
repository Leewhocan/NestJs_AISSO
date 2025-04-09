import { Controller } from '@nestjs/common';
import { FilterService } from './filter.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { TcountryValue } from 'apps/lib/FilterService/FilterService.dto';

@Controller()
export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @MessagePattern('filter.getCountry')
    async getCountry(@Payload() countryValue: TcountryValue) {
        console.log(countryValue);
        return this.filterService.getCountry(countryValue);
    }
    @MessagePattern('filter.getTnved')
    async getTnved() {
        return this.filterService.getTNVED();
    }
}
