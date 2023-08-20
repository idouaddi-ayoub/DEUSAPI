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
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { LocalAuthGuard } from '../local/local.guard';
import { jwtAuthGuard } from '../jwt/jwt-auth.guard';
import { AuthService } from './auth.service';
import { MembershipService } from '../membership/membership.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly membershipService: MembershipService,
  ) {}

  @Post('register')
  async registration(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    await this.membershipService.createMembership(
      user,
      '974cc74a-d70e-459d-8d97-ce68a0b2822d',
    );

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
    const { id, email, dateOfBirth } = request.user.properties;

    return {
      id,
      email,
      dateOfBirth,
    };
  }
}
