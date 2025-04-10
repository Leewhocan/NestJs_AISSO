import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { TcountryValue } from 'apps/lib/FilterService/FilterService.dto';
import { TCreateContract } from 'apps/lib/ContractService/ContractService.dto';
@Injectable()
export class ContractClientService {
    constructor(@Inject('CONTRACT_CLIENT') private contractClient: ClientProxy) {}
    createContract(createContractInfo: TCreateContract) {
        console.log(createContractInfo);
        return this.contractClient.send('contracts.createContract', createContractInfo).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    getLastContracts(page: string = '', amount: string = '', tnved: string = '', country: string = '') {
        console.log(Number(page));
        const resolvePage = Number(page) || 1;
        const resolveAmmount = Number(amount) || 10;
        return this.contractClient
            .send('contracts.getContracts', { page: resolvePage, amount: resolveAmmount, tnved, country })
            .pipe(
                catchError((error) => {
                    console.error('Error fetching users:', error);

                    return throwError(() => new Error('Failed to fetch users. Please try again later.'));
                }),
            );
    }
}
