import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local-strategy';
import { AuthController } from './controllers/auth.controller';
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
  ],
  providers: [AuthService, PassportModule, LocalStrategy, JWTStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
