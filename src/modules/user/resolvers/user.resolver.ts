import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserGuard } from '../guards';
import { UserService } from '../services';
import { CreateUserDto } from '../dto';
import { UserEntity } from '../entities';

@Resolver(of => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [UserEntity])
  @UseGuards(UserGuard)
  async getUsers() {
    return this.userService.findAll();
  }

  @Query(returns => UserEntity)
  @UseGuards(UserGuard)
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
  async changeManager(@Args('id') id: string) {
    return this.userService.changeManager(id);
  }

  @Mutation(returns => UserEntity)
  async assignToManager(
    @Args('userId') userId: string,
    @Args('managerId') managerId: string,
  ) {
    return this.userService.assignToManager(userId, managerId);
  }

  @Mutation(returns => UserEntity, { nullable: true })
  @UseGuards(UserGuard)
  async delete(@Args('id') id: string) {
    return this.userService.delete(id);
  }
}
