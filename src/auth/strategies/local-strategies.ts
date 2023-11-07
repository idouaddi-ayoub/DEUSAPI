import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  //work with cypher
  async validate(login: LoginDto) {
    const user = await this.authService.validateUser(
      login.username,
      login.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
