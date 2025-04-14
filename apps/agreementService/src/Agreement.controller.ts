import { Controller } from '@nestjs/common';
import { AgreementService } from './Agreement.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { TCancelSubAgreement, TCreateAgreement, TSubAgreement } from 'apps/lib/AgreementService/AgreementService.dto';

@Controller()
export class AgreementController {
    constructor(private readonly agreementService: AgreementService) {}

    @MessagePattern('agreement.create')
    async createAgreement(createAgremmentInfo: TCreateAgreement) {
        return this.agreementService.createAgreement(createAgremmentInfo);
    }
    @MessagePattern('agreement.cancel')
    async cancelAgreement(cancelAgreementInfo: TCancelSubAgreement) {
        return this.agreementService.cancelAgreement(cancelAgreementInfo);
    }
    @MessagePattern('agreement.sub')
    async subAgreement(subAgreementInfo: TSubAgreement) {
        return this.agreementService.subAgreement(subAgreementInfo);
    }
    @MessagePattern('agreement.all')
    async getAllAgreement() {
        return this.agreementService.getAll();
    }
}
