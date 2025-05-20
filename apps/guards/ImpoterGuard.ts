import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ImporterGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            await this.jwtService.verifyAsync(token);
            const userInfo = this.jwtService.decode(token);
            console.log(userInfo);
            if (userInfo?.role !== 'IMPORTER') {
                throw new UnauthorizedException('Access restricted to importers only');
            }

            return true;
        } catch (error) {
            // console.log(error);
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
