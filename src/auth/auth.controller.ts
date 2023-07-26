import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './local.guard';
import { jwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async registration(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    return await this.authService.createToken(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Request() request) {
    return await this.authService.createToken(request.user);
  }

  @UseGuards(jwtAuthGuard)
  @Get('user')
  async getUser(@Request() request) {
    return request.user.properties;
  }
}
