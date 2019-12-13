import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import gql from 'graphql-tag';

import { AppModule } from '../app.module';
import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';

describe.skip('AppController (e2e)', () => {
  let app: INestApplication;
  let apolloClient: ApolloServerTestClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const module: GraphQLModule = moduleFixture.get<GraphQLModule>(
      GraphQLModule,
    );
    apolloClient = createTestClient((module as any).apolloServer);
  });

  it('Should be able to use apolloClientTest', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: gql`
        query {
          getUsers {
            name
            id
          }
        }
      `,
      variables: {},
    });
    console.log(result);
    // test whatever you want to test here
  });

  afterAll(async () => {
    await app.close();
  });
});
