import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { jwtConfig } from '../config/jwt.config';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async login(loginInput: LoginInput) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginInput.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginInput.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.generateTokens(user.id, user.email, user.role);

        return {
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                status: user.status,
            },
            ...tokens,
        };
    }

    async refreshTokens(userId: string, email: string, role: string) {
        return this.generateTokens(userId, email, role);
    }

    private async generateTokens(userId: string, email: string, role: string) {
        const payload = { sub: userId, email, role };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload as any, {
                secret: jwtConfig.access.secret,
                expiresIn: jwtConfig.access.expiresIn,
            }),
            this.jwtService.signAsync(payload as any, {
                secret: jwtConfig.refresh.secret,
                expiresIn: jwtConfig.refresh.expiresIn,
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
