import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const { req }: any = GqlExecutionContext.create(context).getContext();
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    const hasRole = () => user.roles.some(role => roles.includes(role));
    return user && user.roles && hasRole();
  }
}
