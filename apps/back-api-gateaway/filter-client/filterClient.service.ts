import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { TcountryValue } from 'apps/lib/FilterService/FilterService.dto';
@Injectable()
export class FilterClientService {
    constructor(@Inject('FILTER_CLIENT') private filterClient: ClientProxy) {}

    getCountry(countryValue: string = '') {
        // console.log(countryValue);
        return this.filterClient.send('filter.getCountry', countryValue).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    getTnved() {
        return this.filterClient.send('filter.getTnved', {}).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
}
