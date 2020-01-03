import { Injectable } from '@nestjs/common';

import { UserService } from '../../modules/user/services';
import { CreateUserDto } from '../../modules/user/dto';

@Injectable()
export class Seeder {
  constructor(private readonly userService: UserService) {}

  seed(user: CreateUserDto) {
    return this.userService.create(user);
  }
}
