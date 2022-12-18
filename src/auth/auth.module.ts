import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthService, PassportModule, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
