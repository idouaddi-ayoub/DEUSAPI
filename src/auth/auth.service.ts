import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EncryptionService } from 'src/encryption/encryption.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(
    username: string,
    password: string,
    UserData: CreateUserDto,
  ) {
    const user = await this.userService.getUserByUsername(username);
    if (
      user &&
      (await bcrypt.compare(
        password,
        await this.encryptionService.hash(UserData.password),
      ))
    ) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(UserData: CreateUserDto) {
    const payload = {
      email: UserData.email,
      sub: {
        username: UserData.username,
      },
    };

    return {
      ...UserData,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
