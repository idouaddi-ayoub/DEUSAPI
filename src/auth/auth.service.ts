import { Injectable } from '@nestjs/common';
import { EncryptionService } from '../encryption/encryption.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encruptionService: EncryptionService,
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
}
