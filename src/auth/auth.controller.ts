import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registration(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Request() request) {
    return request.user.properties;
  }
}
