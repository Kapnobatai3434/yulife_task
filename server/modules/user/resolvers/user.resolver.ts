import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RolesGuard, UserGuard } from '../guards';
import { UserService } from '../services';
import { CreateUserDto } from '../dto';
import { UserEntity } from '../entities';
import { CurrentUser, Roles } from '../decorators';
import { UserType } from '../interfaces';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => UserEntity)
  @Roles(UserType.Admin, UserType.Manager, UserType.User)
  @UseGuards(UserGuard, RolesGuard)
  whoAmI(@CurrentUser() user: UserEntity) {
    return this.userService.findOneById(user.id);
  }

  @Query(returns => [UserEntity])
  @Roles(UserType.Admin, UserType.Manager)
  @UseGuards(UserGuard, RolesGuard)
  async getUsers() {
    return this.userService.findAll();
  }

  @Query(returns => UserEntity)
  @Roles(UserType.Admin, UserType.Manager)
  @UseGuards(UserGuard, RolesGuard)
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

  @Mutation(returns => UserEntity)
  @Roles(UserType.Admin, UserType.Manager)
  @UseGuards(UserGuard, RolesGuard)
  async changeManager(@Args('id') id: string) {
    return this.userService.changeManager(id);
  }

  @Mutation(returns => UserEntity)
  @Roles(UserType.Admin, UserType.Manager)
  @UseGuards(UserGuard, RolesGuard)
  async assignToManager(
    @Args('userId') userId: string,
    @Args('managerId') managerId: string,
  ) {
    return this.userService.assignToManager(userId, managerId);
  }

  @Mutation(returns => UserEntity, { nullable: true })
  @Roles(UserType.Admin, UserType.Manager)
  @UseGuards(UserGuard, RolesGuard)
  async delete(@Args('id') id: string) {
    return this.userService.delete(id);
  }
}
