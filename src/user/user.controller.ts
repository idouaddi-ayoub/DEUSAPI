import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUserByUsername(@Body() user: LoginDto) {
    return this.userService.getUserByUsername(user.username);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
