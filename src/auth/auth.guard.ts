import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { clerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  //request headers
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization || ``;
    const headerToken = authHeader.split(' ')[1];

    const { isUnknown, isSignedIn } = await clerkClient.authenticateRequest({
      headerToken,
    });
    if (isUnknown && !isSignedIn) throw new UnauthorizedException();
    return true;
  }
}
