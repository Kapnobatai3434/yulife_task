import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (!req || !req.user) {
      throw new UnauthorizedException();
    }
    const hasRole = () => req.user.roles.some((role: string) => roles.includes(role));
    return req.user && req.user.roles && hasRole();
  }
}
