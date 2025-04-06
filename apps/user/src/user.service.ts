import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
type UserLoginInput = {
    email: string;

    password: string;
};
type AuthResult = { acseesToken: string; userName: string; role: string };
@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}
    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }
    async auth(userInfo: Prisma.UserCreateInput): Promise<AuthResult> {
        try {
            const user = await this.prisma.user.create({
                data: userInfo,
            });
            const response = await this.signIn(user);
            return response;
        } catch (error) {
            console.error('Error creating user:', error);

            throw new Error('Failed to create user. Please try again later.');
        }
    }
    async login(loginInfo: UserLoginInput): Promise<AuthResult> {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email: loginInfo.email,
                    password: loginInfo.password,
                },
            });
            console.log(user);
            const response = await this.signIn(user);
            return response;
        } catch (error) {
            console.error('Error find user:', error);

            throw new Error('Failed to create user. Please try again later.');
        }
    }

    async signIn(user: User): Promise<AuthResult> {
        const tokenPayload = {
            username: user.name,
            role: user.role,
            id: user.id,
        };
        const acseesToken = await this.jwtService.signAsync(tokenPayload);
        return { acseesToken, userName: user.name, role: user.role };
    }
}
