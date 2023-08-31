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
  getUserByUsername(@Body() user: LoginDto) {
    console.log('In the route handler logic with body', user);
    return this.userService.getUserByUsername(user.username);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    console.log('In the route handler logic with body', body);
    return this.userService.createUser(body);
  }
}
