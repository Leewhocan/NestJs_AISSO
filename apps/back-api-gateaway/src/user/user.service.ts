import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
    addUser(userInfo) {
        return this.usersClient.send('user.addUser', userInfo).pipe(
            catchError((error) => {
                // Log the error
                console.error('Error fetching users:', error);

                // Throw a new error with a more user-friendly message
                return throwError(() => new Error('Failed to fetch users. Please try again later.'));
            }),
        );
    }
}
