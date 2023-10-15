import { Controller, Get, Post, Param } from '@nestjs/common';
import { MembershipService } from './membership.service';

@Controller('membership')
export class MembershipController {
  constructor(private membershipService: MembershipService) {}

  @Get(':id')
  getUserMembershipById(@Param('id') id: number) {
    return this.membershipService.getUserMembership(id);
  }

  @Post(':id')
  createMembershipById(@Param('id') id: number) {
    return this.membershipService.createMembership(id);
  }
}
