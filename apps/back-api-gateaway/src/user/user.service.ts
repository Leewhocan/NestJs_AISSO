import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

    findAll() {
        return this.usersClient.send('user.findAll', {}).pipe(
            catchError((error) => {
                // Log the error
                console.error('Error fetching users:', error);

                // Throw a new error with a more user-friendly message
                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    auth(userInfo) {
        return this.usersClient.send('user.auth', userInfo).pipe(
            catchError((error) => {
                // Log the error
                console.error('Error fetching users:', error);

                // Throw a new error with a more user-friendly message
                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
    login(loginInfo) {
        return this.usersClient.send('user.login', loginInfo).pipe(
            catchError((error) => {
                console.log('пришла такая ошибка =', error, error?.$$typeof);
                if (error instanceof RpcException) {
                    const err = error.getError();
                    throw new HttpException(
                        err['message'] || 'Login failed',
                        err['statusCode'] || HttpStatus.BAD_REQUEST,
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
