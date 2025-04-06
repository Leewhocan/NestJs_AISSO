import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USERS_CLIENT',
                transport: Transport.TCP,
                options: { host: 'localhost', port: 3010 },
            },
        ]),
        JwtModule.register({ global: true, secret: 'secret_lol', signOptions: { expiresIn: '12h' } }),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
