import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() login: LoginDto) {
    console.log(login);
    try {
      return await this.authService.login(login.username, login.password);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.userService.createUser(createUserDto);
  }
}
