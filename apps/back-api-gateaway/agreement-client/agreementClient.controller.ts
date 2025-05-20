import { Controller, Get, Post, Body, UseGuards, Query, UseInterceptors, Put, Delete } from '@nestjs/common';
import { AgreementClientService } from './agreementClient.service';

import { addAuthorInterceptor } from 'apps/interceptors/AddAuthorInterceptor';
import {
    TCancelSubAgreement,
    TCreateAgreement,
    TGetByAuthor,
    TGetByContract,
    TSubAgreement,
} from 'apps/lib/AgreementService/AgreementService.dto';
import { ExporterGuard } from 'apps/guards/ExporterGuard';
import { ImporterGuard } from 'apps/guards/ImpoterGuard';

@Controller('agreement')
export class AgreementClientController {
    constructor(private readonly agreementClientService: AgreementClientService) {}

    @Post()
    @UseGuards(ExporterGuard)
    @UseInterceptors(addAuthorInterceptor)
    createAgreementController(@Body() createAgremmentInfo: TCreateAgreement) {
        return this.agreementClientService.createAgreement(createAgremmentInfo);
    }
    @Delete()
    @UseGuards(ExporterGuard)
    @UseInterceptors(addAuthorInterceptor)
    cancelAgreementController(@Body() cancelAgreementInfo: TCancelSubAgreement) {
        return this.agreementClientService.cancelAgreement(cancelAgreementInfo);
    }
    @Post('sub')
    @UseGuards(ImporterGuard)
    subAgreementController(@Body() subAgreementInfo: TSubAgreement) {
        return this.agreementClientService.subAgreement(subAgreementInfo);
    }
    @Post('contract')
    @UseGuards(ImporterGuard)
    @UseInterceptors(addAuthorInterceptor)
    getAllController(@Body() getAgreementByContract: TGetByContract) {
        return this.agreementClientService.getAgreementByContract(getAgreementByContract);
    }
    @Post('byExporter')
    @UseGuards(ExporterGuard)
    @UseInterceptors(addAuthorInterceptor)
    getAgreementBuAuthor(@Body() getAgreementBuAuthor: TGetByAuthor) {
        return this.agreementClientService.getAgreementBuAuthor(getAgreementBuAuthor);
    }
}
