import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/services/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rta } = user;
      return rta;
    }
    return null;
  }

  // generateJWT(user: User) {
  //   const payload: PayloadToken = { role: user.role, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     user,
  //   };
  // }
}
