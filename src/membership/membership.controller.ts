import { Controller, UseGuards, Get, Post } from '@nestjs/common';
import { MembershipService } from './membership.service';

@Controller('membership')
export class MembershipController {
  constructor(private membershipService: MembershipService) {}

  @Get()
  getUserByUsername(userId: string, membershipId: string) {
    console.log('In the route handler logic with body', userId, membershipId);
    return this.membershipService.getUserMembership(userId, membershipId);
  }

  @Post()
  createUser(userId: string, membershipId: string) {
    console.log('In the route handler logic with body', userId, membershipId);
    return this.membershipService.createMembership(userId);
  }
}
