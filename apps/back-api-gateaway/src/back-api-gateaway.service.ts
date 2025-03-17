import { Injectable } from '@nestjs/common';

@Injectable()
export class BackApiGateawayService {
    getHello(): string {
        return 'Hello World!';
    }
}
