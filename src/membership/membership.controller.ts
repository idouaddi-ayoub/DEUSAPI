import { Controller, UseGuards, Get, Post } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { User } from '../user/user.service';

@Controller('membership')
export class MembershipController {
  constructor(private membershipService: MembershipService) {}

  @Get()
  getUserByUsername(userId: string, membershipId: string) {
    console.log('In the route handler logic with body', userId, membershipId);
    return this.membershipService.getUserMembership(userId, membershipId);
  }

  @Post()
  createUser(User: User, membershipId: string) {
    console.log('In the route handler logic with body', User, membershipId);
    return this.membershipService.createMembership(User);
  }
}
