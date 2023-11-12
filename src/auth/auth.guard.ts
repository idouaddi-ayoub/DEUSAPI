import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { response } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  //request headers
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const publicKey = `${process.env.CLERK_PEM_PUBLIC_KEY}`;
    if (publicKey) return true;
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    const sessionToken = request.cookie.get('__session');

    if (!sessionToken) throw new UnauthorizedException('Unvalid session token');

    try {
      let decoded: any;
      if (token) {
        decoded = jwt.verify(token, publicKey);
        response.status(200).json({ sessionToken: decoded });
        return;
      } else {
        decoded = jwt.verify(sessionToken, publicKey);
        response.status(200).json({ sessionToken: decoded });
        return;
      }
    } catch (error) {
      response.status(400).json({
        error: 'Invalid Token',
      });
    }
    return type === 'Bearer' ? token : undefined;
  }
}
