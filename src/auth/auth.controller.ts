import { Body, Controller, Post, Request, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
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

    await this.membershipService.createMembership(user);

    return await this.authService.createToken(user);
  }

  @Post('login')
  async postLogin(@Request() request) {
    return await this.authService.createToken(request.user);
  }

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
