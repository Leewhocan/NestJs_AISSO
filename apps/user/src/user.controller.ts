import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern('user.findAll')
    findAll() {
        return this.userService.findAll();
    }
    @MessagePattern('user.auth')
    async auth(@Payload() userInfo) {
        try {
            return await this.userService.auth(userInfo);
        } catch (error) {
            throw new RpcException({
                status: 'error',
                message: error.message,
                statusCode: error.getStatus?.() || 500,
                details: {
                    service: 'user-service',
                    timestamp: new Date().toISOString(),
                },
            });
        }
    }
    @MessagePattern('user.login')
    async login(@Payload() loginInfo) {
        try {
            const result = await this.userService.login(loginInfo);
            return result;
        } catch (error) {
            throw new RpcException({
                status: 'error',
                message: error.message,
                statusCode: error.getStatus?.() || 500,
                details: {
                    service: 'user-service',
                    timestamp: new Date().toISOString(),
                },
            });
        }
    }
    @MessagePattern('user.findOneById')
    async findOneById(@Payload() findOneInfo) {
        try {
            const result = await this.userService.findOneById(findOneInfo);
            return result;
        } catch (error) {
            throw new RpcException({
                status: 'error',
                message: error.message,
                statusCode: error.getStatus?.() || 500,
                details: {
                    service: 'user-service',
                    timestamp: new Date().toISOString(),
                },
            });
        }
    }
}
