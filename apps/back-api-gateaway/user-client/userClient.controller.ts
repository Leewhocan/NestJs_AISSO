import { Controller, Get, Post, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserClientService } from './userClient.service';
import { AuthGuard } from '../../guards/AuthGuard';
import { addAuthorInterceptor } from 'apps/interceptors/AddAuthorInterceptor';

@Controller('user')
export class UserClientController {
    constructor(private readonly userCleintService: UserClientService) {}
    // @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.userCleintService.findAll();
    }
    @UseGuards(AuthGuard)
    @UseInterceptors(addAuthorInterceptor)
    @Post('me')
    getMe(@Body() findInfo) {
        return this.userCleintService.findOneById(findInfo);
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
