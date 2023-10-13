import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUserById(
    @Param('id') id: number,
    // @Body() user: LoginDto
  ) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() UserData: UpdateUserDto) {
    return this.userService.updateUser(id, UserData);
  }
}
