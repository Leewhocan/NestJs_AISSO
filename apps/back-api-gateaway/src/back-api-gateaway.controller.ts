import { Controller, Get } from '@nestjs/common';
import { BackApiGateawayService } from './back-api-gateaway.service';

@Controller()
export class BackApiGateawayController {
    constructor(private readonly backApiGateawayService: BackApiGateawayService) {}

    @Get()
    getHello(): string {
        return this.backApiGateawayService.getHello();
    }
}
