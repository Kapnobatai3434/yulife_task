import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserGuard } from '../guards';
import { UserService } from '../services';
import { CreateUserDto } from '../dto';
import { UserEntity } from '../entities';

@Resolver(of => UserEntity)
export class UserResolvers {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [UserEntity])
  @UseGuards(UserGuard)
  async getUsers() {
    return this.userService.findAll();
  }

  @Query(returns => UserEntity)
  @UseGuards(UserGuard)
  async findOneById(
    @Args('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.userService.findOneById(id);
  }

  @Mutation(returns => UserEntity)
  async create(@Args('createUser') args: CreateUserDto) {
    return this.userService.create(args);
  }

  @Mutation(returns => UserEntity)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.userService.login({ username, password });
  }

  @Mutation(returns => UserEntity, { nullable: true })
  @UseGuards(UserGuard)
  async delete(@Args('id') id: string) {
    return this.userService.delete(id);
  }
}
