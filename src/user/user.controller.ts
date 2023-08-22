import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticationGuard } from '../guard/authentication.guard';
import { LoginDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthenticationGuard)
  @Get()
  getUser(@Body() user: LoginDto) {
    console.log('In the rout handler logic with body', user);
    return this.userService.getUser(user);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    console.log('In the rout handler logic with body', body);
    return this.userService.createUser(body);
  }
}
