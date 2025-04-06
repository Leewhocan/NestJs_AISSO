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
        return this.userService.auth(userInfo);
    }
    @MessagePattern('user.login')
    async login(@Payload() loginInfo) {
        try {
            console.log('Received login request for:', loginInfo.email); // Логируем входящий запрос

            const result = await this.userService.login(loginInfo);
            console.log('Login successful for:', loginInfo.email); // Логируем успех

            return result;
        } catch (error) {
            console.error('Login failed:', error.message); // Логируем ошибку

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
