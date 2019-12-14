import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RolesGuard, UserGuard } from '../guards';
import { UserService } from '../services';
import { CreateUserDto } from '../dto';
import { UserEntity } from '../entities';
import { Roles } from '../decorators';
import { UserType } from '../interfaces';

@Resolver(of => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard, RolesGuard)
  @Query(returns => [UserEntity])
  async getUsers() {
    return this.userService.findAll();
  }

  @UseGuards(UserGuard, RolesGuard)
  @Query(returns => UserEntity)
  @Roles(UserType.Admin, UserType.Manager)
  async findOneById(
    @Args('id')
    id: string,
  ) {
    return this.userService.findOneById(id);
  }

  @Mutation(returns => UserEntity)
  async createUser(@Args('createUser') args: CreateUserDto) {
    return this.userService.create(args);
  }

  @Mutation(returns => UserEntity)
  async loginUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.userService.login({ username, password });
  }

  @UseGuards(UserGuard, RolesGuard)
  @Mutation(returns => UserEntity)
  async changeManager(@Args('id') id: string) {
    return this.userService.changeManager(id);
  }

  @UseGuards(UserGuard, RolesGuard)
  @Mutation(returns => UserEntity)
  async assignToManager(
    @Args('userId') userId: string,
    @Args('managerId') managerId: string,
  ) {
    return this.userService.assignToManager(userId, managerId);
  }

  @UseGuards(UserGuard, RolesGuard)
  @Mutation(returns => UserEntity, { nullable: true })
  async delete(@Args('id') id: string) {
    return this.userService.delete(id);
  }
}
