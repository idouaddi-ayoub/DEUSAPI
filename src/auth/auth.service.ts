import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../encryption/encryption.service';
import { User, UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encruptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (
      user !== undefined &&
      (await this.encruptionService.compare(password, user.properties.password))
    ) {
      return user;
    }

    return null;
  }

  async createToken(user: User) {
    //properties deconstruction
    const { id, email, dateOfBirth } = user.properties;
    //properties encoding into JWT
    return {
      access_token: this.jwtService.sign({
        sub: id,
        email,
        dateOfBirth,
      }),
    };
  }
}
