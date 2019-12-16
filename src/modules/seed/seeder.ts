import { Injectable } from '@nestjs/common';

import { UserService } from '../user/services';

@Injectable()
export class Seeder {
  constructor(
    private readonly userService: UserService,
  ) {}

  seed(user) {
    return this.userService.create(user);
  }
}
