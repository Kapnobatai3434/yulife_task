import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../modules/user/entities';
import { UserModule } from '../../modules/user';
import { configService } from '../../config';
import { Seeder } from './seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
  ],
  providers: [Seeder],
})
export class SeedModule {}
