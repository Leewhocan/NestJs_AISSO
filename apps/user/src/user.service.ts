import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';
import { hashPassword } from './utils/bcrypt';
import * as bcrypt from 'bcrypt';
import { UserLoginInput, AuthResult } from 'apps/lib/UserService/UserService.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}
    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }
    async auth(userInfo: Prisma.UserCreateInput): Promise<AuthResult> {
        try {
            const password = await hashPassword(userInfo.password);
            const user = await this.prisma.user.create({ data: { ...userInfo, password } });
            const response = await this.signIn(user);
            return response;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Пользователь с таким email уже существует');
                }
            }
            throw new InternalServerErrorException('Ошибка сервиса');
        }
    }
    async login(loginInfo: UserLoginInput): Promise<AuthResult> {
        try {
            console.log(loginInfo);
            const user = await this.prisma.user.findFirst({
                where: { email: loginInfo.email },
            });

            if (!user) {
                throw new UnauthorizedException('Пользователь не найден');
            }

            const isPasswordValid = await bcrypt.compare(loginInfo.password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Неверный пароль');
            }

            return this.signIn(user);
        } catch (error) {
            console.log(error);
            if (error instanceof UnauthorizedException) {
                throw error;
            }

            throw new InternalServerErrorException('Ошибка сервиса');
        }
    }
    async findOneById(findOneInfo): Promise<AuthResult> {
        console.log(findOneInfo);
        try {
            const id = findOneInfo.authorId;

            const user = await this.prisma.user.findUnique({
                where: { id },
            });

            if (!user) {
                throw new NotFoundException('Пользователь не найден');
            }

            return this.signIn(user);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException('Ошибка при получении пользователя');
        }
    }
    async signIn(user: User): Promise<AuthResult> {
        const tokenPayload = {
            username: user.name,
            role: user.role,
            id: user.id,
        };
        const acseesToken = await this.jwtService.signAsync(tokenPayload);
        return { acseesToken, userName: user.name, role: user.role, id: user.id };
    }
}
