import { getRepositoryToken } from '@nestjs/typeorm';

import { UserResolver } from './index';
import { UserService } from '../services';
import { UserEntity } from '../entities';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserType } from '../interfaces';

export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

const fixtures = {
  testUser: {
    name: 'Ivan',
    username: 'fakeUsername',
    id: 'bc08a057-57fd-410c-8d3d-6669c177a70a',
    password: 'fake',
    managerId: '',
    type: UserType.User,
  },
  testManager: {
    name: 'Ivan2',
    username: 'fakeUsername2',
    id: 'bc08a057-57fd-410c-8d3d-6669c177fake',
    password: 'fake2',
    managerId: '',
    type: UserType.Manager,
  },
};

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;
  let repo: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    userResolver = new UserResolver(userService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userResolver).toBeDefined();
  });

  it('should return a new entity', async () => {
    jest
      .spyOn(userService, 'create')
      // @ts-ignore
      .mockImplementation(() => fixtures.testUser);
    const user = await userResolver.create(fixtures.testUser);

    expect(user).toEqual(fixtures.testUser);
  });

  it('should return an array of users', async () => {
    jest
      .spyOn(userService, 'findAll')
      // @ts-ignore
      .mockImplementation(() => [fixtures.testUser]);

    expect(await userResolver.getUsers()).toEqual([fixtures.testUser]);
  });

  it('should find user by id', async () => {
    jest
      .spyOn(userService, 'findOneById')
      // @ts-ignore
      .mockImplementation(() => fixtures.testUser);

    expect(await userResolver.findOneById(fixtures.testUser.id)).toEqual(
      fixtures.testUser,
    );
  });

  it('should return user on login', async () => {
    jest
      .spyOn(userService, 'login')
      // @ts-ignore
      .mockImplementation(() => fixtures.testUser);

    expect(
      await userResolver.login(
        fixtures.testUser.username,
        fixtures.testUser.password,
      ),
    ).toEqual(fixtures.testUser);
  });

  it('should promote user', async () => {
    const promotedUser = Object.assign(fixtures.testUser, {
      type: UserType.Manager,
    });
    jest.spyOn(userService, 'promote').mockImplementation(
      () =>
        // @ts-ignore
        promotedUser,
    );

    expect(await userResolver.promote(fixtures.testUser.id)).toEqual(
      promotedUser,
    );
  });

  it('should assign to a manager', async () => {
    const userWithManager = Object.assign(fixtures.testUser, {
      manager: fixtures.testManager,
    });

    jest.spyOn(userService, 'assignToManager').mockImplementation(
      () =>
        // @ts-ignore
        userWithManager,
    );

    expect(
      await userResolver.assignToManager(
        fixtures.testUser.id,
        fixtures.testManager.id,
      ),
    ).toEqual(userWithManager);
  });

  it('should delete user', async () => {
    jest.spyOn(userService, 'delete').mockImplementation(
      () =>
        // @ts-ignore
        fixtures.testUser,
    );

    expect(await userResolver.delete(fixtures.testUser.id)).toEqual(
      fixtures.testUser,
    );
  });
});
