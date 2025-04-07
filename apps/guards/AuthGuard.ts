import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtServise: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requset = context.switchToHttp().getRequest();
        const authorization = requset.headers.authorization;
        const token = authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            await this.jwtServise.verifyAsync(token);
            return true;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
