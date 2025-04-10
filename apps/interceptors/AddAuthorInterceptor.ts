import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class addAuthorInterceptor implements NestInterceptor {
    constructor(private jwtServise: JwtService) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const token = authorization?.split(' ')[1];
        const userInfo = this.jwtServise.decode(token);
        if (request.body && userInfo.id) {
            request.body.authorId = userInfo.id;
        }
        return next.handle();
    }
}
