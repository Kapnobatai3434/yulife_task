import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_PIPE } from '@nestjs/core';

import { UserModule } from './modules/user';
import { configService } from './config';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
