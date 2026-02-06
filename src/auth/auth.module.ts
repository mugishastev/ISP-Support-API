import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { jwtConfig } from '../config/jwt.config';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConfig.access.secret,
            signOptions: { expiresIn: jwtConfig.access.expiresIn },
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy, RefreshStrategy],
    exports: [AuthService],
})
export class AuthModule { }
