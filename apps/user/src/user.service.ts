import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';
import { hashPassword } from './utils/bcrypt';
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
            const password = await hashPassword(userInfo.password);
            const user = await this.prisma.user.create({ data: { ...userInfo, password } });
            const response = await this.signIn(user);
            return response;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user. Please try again later.');
        }
    }
    async login(loginInfo: UserLoginInput): Promise<AuthResult> {
        try {
            // 1. Находим пользователя по email (без пароля!)
            const user = await this.prisma.user.findFirst({
                where: { email: loginInfo.email, password: loginInfo.password },
            });

            // 2. Проверяем существование пользователя
            if (!user) {
                console.log(user);
                throw new UnauthorizedException('Пользователь не найден');
            }

            // 3. Безопасное сравнение паролей
            // const isPasswordValid = await bcrypt.compare(loginInfo.password, user.password);
            // if (!isPasswordValid) {
            //     throw new UnauthorizedException('Неверный пароль');
            // }

            // 4. Генерация токена
            return this.signIn(user);
        } catch (error) {
            // Перехватываем только ожидаемые ошибки
            if (error instanceof UnauthorizedException) {
                throw error; // Пробрасываем дальше
            }
            // Логируем неожиданные ошибки

            throw new InternalServerErrorException('Ошибка сервера при входе');
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
