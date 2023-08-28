import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Authentification
  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  @Get()
  getNodes(): Promise<string> {
    return this.appService.getNodes();
  }
}
