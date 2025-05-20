import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import {
    TCancelSubAgreement,
    TCreateAgreement,
    TGetByAuthor,
    TGetByContract,
    TSubAgreement,
} from 'apps/lib/AgreementService/AgreementService.dto';
@Injectable()
export class AgreementClientService {
    constructor(@Inject('AGREEMENT_CLIENT') private agreementClient: ClientProxy) {}
    createAgreement(createAgremmentInfo: TCreateAgreement) {
        return this.agreementClient.send('agreement.create', createAgremmentInfo).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    cancelAgreement(cancelAgremmentInfo: TCancelSubAgreement) {
        return this.agreementClient.send('agreement.cancel', cancelAgremmentInfo).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    subAgreement(subAgremmentInfo: TSubAgreement) {
        return this.agreementClient.send('agreement.sub', subAgremmentInfo).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    getAgreementByContract(getAgreementByContract: TGetByContract) {
        return this.agreementClient.send('agreement.getByContract', getAgreementByContract).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    getAgreementBuAuthor(getAgreementByAuthor: TGetByAuthor) {
        return this.agreementClient.send('agreement.getByAuthor', getAgreementByAuthor).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
}
