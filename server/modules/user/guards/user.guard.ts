import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

import { configService } from '../../../config';

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req }: any = GqlExecutionContext.create(context).getContext();
    if (!req || !req.headers || !req.headers.authorization) {
      return false;
    }
    req.user = await this.validateToken(req.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];

    try {
      return await jwt.verify(token, configService.getSecret());
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
