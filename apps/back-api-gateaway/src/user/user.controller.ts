import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/AuthGuard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post()
    addUser(@Body() userInfo) {
        return this.userService.addUser(userInfo);
    }
}
