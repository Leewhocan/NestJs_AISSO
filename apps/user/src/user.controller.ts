import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

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
        return this.userService.login(loginInfo);
    }
}
