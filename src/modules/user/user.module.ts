import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DateScalar } from '../../common/scalars';
import { UserResolver } from './resolvers';
import { UserService } from './services';
import { UserEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserResolver, UserService, DateScalar],
})
export class UserModule {}
