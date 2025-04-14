import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { TcountryValue } from 'apps/lib/FilterService/FilterService.dto';
import {
    TCreateContract,
    TDeleteContract,
    TGetContractByAuthor,
    TUpdateContract,
} from 'apps/lib/ContractService/ContractService.dto';
@Injectable()
export class ContractClientService {
    constructor(@Inject('CONTRACT_CLIENT') private contractClient: ClientProxy) {}
    createContract(createContractInfo: TCreateContract) {
        return this.contractClient.send('contracts.createContract', createContractInfo).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    getLastContracts(page: string = '', amount: string = '', tnved: string = '', country: string = '') {
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
    getContractById(id: string) {
        const nummberId = Number(id);
        return this.contractClient.send('contracts.getById', nummberId).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    updateContract(updateContractInfo: TUpdateContract) {
        return this.contractClient.send('contract.update', updateContractInfo).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    deleteContract(deleteContractInfo: TDeleteContract) {
        console.log(deleteContractInfo);
        return this.contractClient.send('contract.delete', deleteContractInfo).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }

    getContractByAuthor(contractByAuthorInfo: TGetContractByAuthor) {
        console.log(contractByAuthorInfo);
        return this.contractClient.send('contract.getByAuthor', contractByAuthorInfo).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
}
