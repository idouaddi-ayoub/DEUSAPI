import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('client')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Authentification
  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  @Get()
  getCount(): Promise<string> {
    return this.appService.getCount();
  }
}
