import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/AuthGuard';
import { userInfo } from 'os';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    // @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    auth(@Body() userInfo) {
        return this.userService.auth(userInfo);
    }
    @Post('login')
    login(@Body() loginInfo) {
        return this.userService.login(loginInfo);
    }
}
