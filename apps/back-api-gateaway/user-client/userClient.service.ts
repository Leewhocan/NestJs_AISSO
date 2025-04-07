import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class UserClientService {
    constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

    findAll() {
        return this.usersClient.send('user.findAll', {}).pipe(
            catchError((error) => {
                console.error('Error fetching users:', error);

                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    auth(userInfo) {
        return this.usersClient.send('user.auth', userInfo).pipe(
            catchError((error) => {
                if (error?.details) {
                    console.log(error);
                    throw new HttpException(
                        { statusCode: error.statusCode, message: error.message, details: error.details },
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }

                // Для других ошибок
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Login service unavailable',
                        details: 'Please try again later',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }),
        );
    }
    login(loginInfo) {
        return this.usersClient.send('user.login', loginInfo).pipe(
            catchError((error) => {
                if (error?.details) {
                    console.log(error);
                    throw new HttpException(
                        { statusCode: error.statusCode, message: error.message, details: error.details },
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }

                // Для других ошибок
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Login service unavailable',
                        details: 'Please try again later',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }),
        );
    }
}
