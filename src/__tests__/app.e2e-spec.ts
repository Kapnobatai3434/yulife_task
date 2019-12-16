import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';

import { UserModule } from '../modules/user';
import { configService } from '../config';
import { Seeder } from '../modules/seed/seeder';
import { users } from '../modules/seed/data';
import { UserType } from '../modules/user/interfaces';
import { CREATE_USER, LOGIN_USER } from './mutations';
import { FIND_ALL_USERS, FIND_BY_ID, WHO_AM_I } from './queries';

describe('e2e', () => {
  let app: INestApplication;
  let apolloClient: ApolloServerTestClient;
  let seeder;
  let token;
  let mutate;
  let query;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
          context: ({ req }) => ({
            req: { headers: { authorization: 'Bearer ' + token } },
          }),
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

    mutate = apolloClient.mutate;
    query = apolloClient.query;

    return Promise.all(users.map(async user => await seeder.seed(user)));
  });

  it('should login as admin', async () => {
    const {
      data: { loginUser },
    }: any = await mutate({
      mutation: LOGIN_USER,
      variables: { username: users[0].username, password: users[0].password },
    });

    expect(loginUser.type).toBe(UserType.Admin);
    token = loginUser.token;
  });

  it('should create a new user', async () => {
    const fakeUser = {
      name: 'Fakename',
      username: 'FakeUsername2',
      password: 'fakepassword',
    };
    const {
      data: { createUser },
    }: any = await mutate({
      mutation: CREATE_USER,
      variables: { ...fakeUser },
    });

    expect(createUser.username).toBe(fakeUser.username);
  });

  it('should find user by id', async () => {
    const {
      data: { loginUser },
    }: any = await mutate({
      mutation: LOGIN_USER,
      variables: { username: users[3].username, password: users[3].password },
    });

    const {
      data: { findOneById },
    }: any = await query({
      query: FIND_BY_ID,
      variables: { id: loginUser.id },
    });

    expect(findOneById.id).toEqual(loginUser.id);
    expect(findOneById.type).toEqual(loginUser.type);
    expect(findOneById.name).toEqual(loginUser.name);
  });

  it('should query all users', async () => {
    const {
      data: { getUsers },
    }: any = await query({
      query: FIND_ALL_USERS,
    });

    expect(getUsers.length).toBeGreaterThan(2);
  });

  it('should return admin for whoAmI query', async () => {
    const {
      data: { whoAmI },
    }: any = await query({
      query: WHO_AM_I,
    });

    expect(whoAmI.type).toEqual(UserType.Admin);
  });

  it('should trow an error because JWT token is expired', async () => {
    token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1N2I2MWUzLTE3OTctNGM2ZC05NjgyLTk5NjIzMzgyOTA4NiIsInVzZXJuYW1lIjoiZmFrZSIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTU3NjQxMTIyMSwiZXhwIjoxNTc2NDEyMTIxfQ.FP9l4z6FO_ex216rbMEZowjSkxxv-BiNA_de0QxUFys';

    const { errors }: any = await query({
      query: WHO_AM_I,
    });

    expect(errors.length).toBeTruthy();
    expect(errors[0].message).toEqual('Token error: jwt expired');
  });

  it('should trow an error because JWT has the wrong format', async () => {
    token = null;

    const { errors }: any = await query({
      query: WHO_AM_I,
    });

    expect(errors.length).toBeTruthy();
    expect(errors[0].message).toEqual('Token error: jwt malformed');
  });

  afterAll(async () => {
    await app.close();
  });
});
