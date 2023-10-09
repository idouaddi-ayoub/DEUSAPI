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
import { LocalAuthGuard } from '../guard/local.guard';
import { jwtAuthGuard } from '../guard/jwt-auth.guard';
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
    const user = await this.userService.createUser(dto);

    await this.membershipService.createMembership('459d-8d97-ce68a0b2822d');

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
