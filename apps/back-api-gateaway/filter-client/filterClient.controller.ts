import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { FilterClientService } from './filterClient.service';
import { AuthGuard } from '../../guards/AuthGuard';
import { TcountryValue } from 'apps/lib/FilterService/FilterService.dto';

@Controller('filter')
export class FilterClientController {
    constructor(private readonly filterClientService: FilterClientService) {}
    // @UseGuards(AuthGuard)
    @Get('country')
    getCountry(@Query('countryId') countryValue?: string) {
        return this.filterClientService.getCountry(countryValue);
    }
    @Get('tnved')
    getTnved() {
        return this.filterClientService.getTnved();
    }
}
