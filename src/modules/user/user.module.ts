import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DateScalar } from '../../common/scalars';
import { UserResolvers } from './resolvers';
import { UserService } from './services';
import { UserEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserResolvers, UserService, DateScalar],
})
export class UserModule {}
