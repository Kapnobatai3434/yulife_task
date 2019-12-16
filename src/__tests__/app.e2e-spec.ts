import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import gql from 'graphql-tag';
import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';

import { UserModule } from '../modules/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config';
import { Seeder } from '../modules/seed/seeder';
import { users } from '../modules/seed/data';
import { UserType } from '../modules/user/interfaces';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let apolloClient: ApolloServerTestClient;
  let seeder;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
          context: ({ req }) => ({ req }),
        }),
        TypeOrmModule.forRoot(configService.getTestingOrmConfig()),
      ],
      providers: [Seeder],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const module: GraphQLModule = moduleFixture.get<GraphQLModule>(
      GraphQLModule,
    );
    apolloClient = createTestClient((module as any).apolloServer);
    seeder = moduleFixture.get(Seeder);

    return Promise.all(users.map(async user => await seeder.seed(user)));
  });

  it('Should be able to use apolloClientTest', async () => {
    const { mutate } = apolloClient;
    const LOGIN_USER = gql`
      mutation {
        loginUser(username: "fakeUsername4", password: "fake2") {
          id
          name
          username
          token
          type
        }
      }
    `;
    const { data }: any = await mutate({
      mutation: LOGIN_USER,
    });

    expect(data.loginUser.type).toBe(UserType.Admin);
  });

  afterAll(async () => {
    await app.close();
  });
});
