import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({ global: true, secret: 'secret_lol', signOptions: { expiresIn: '12h' } })],
    controllers: [UserController],
    providers: [UserService, PrismaService],
})
export class UserModule {}
