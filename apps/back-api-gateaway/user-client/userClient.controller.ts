import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserClientService } from './userClient.service';
import { AuthGuard } from '../../guards/AuthGuard';

@Controller('user')
export class UserClientController {
    constructor(private readonly userCleintService: UserClientService) {}
    // @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.userCleintService.findAll();
    }

    @Post()
    auth(@Body() userInfo) {
        return this.userCleintService.auth(userInfo);
    }
    @Post('login')
    login(@Body() loginInfo) {
        return this.userCleintService.login(loginInfo);
    }
}
