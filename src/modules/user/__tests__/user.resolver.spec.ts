import { Test, TestingModule } from '@nestjs/testing';

import { UserResolver } from '../resolvers';
import { UserService } from '../services';
import { UserType } from '../interfaces';
import { managerFixture, serviceMockFactory, userFixture } from './fixtures';

describe('UserResolver', () => {
  let userResolver;
  let userService;
  let testUser;
  let testManager;

  beforeEach(async () => {
    jest.restoreAllMocks();
    testUser = userFixture();
    testManager = managerFixture();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useFactory: serviceMockFactory,
        },
      ],
    }).compile();

    userService = module.get(UserService);
    userResolver = new UserResolver(userService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userResolver).toBeDefined();
  });

  it('should return a new user', async () => {
    userService.create.mockReturnValue(testUser);
    const user = await userResolver.createUser(testUser);

    expect(user).toEqual(testUser);
  });

  it('should return an array of users', async () => {
    userService.findAll.mockReturnValue([testUser]);

    expect(await userResolver.getUsers()).toEqual([testUser]);
  });

  it('should find user by id', async () => {
    userService.findOneById.mockReturnValue(testUser);

    expect(await userResolver.findOneById(testUser.id)).toEqual(testUser);
  });

  it('should return user on login', async () => {
    userService.login.mockReturnValue(testUser);

    expect(await userResolver.loginUser('fakeUsername', 'fake')).toEqual(testUser);
  });

  it('should promote user', async () => {
    const userManager = userFixture({
      type: UserType.Manager,
    });
    userService.changeManager.mockReturnValue(userManager);

    expect(await userResolver.changeManager(testUser.id)).toEqual(userManager);
  });

  it('should assign to a manager', async () => {
    const userWithManager = userFixture({
      manager: testManager,
    });
    userService.assignToManager.mockReturnValue(userWithManager);

    expect(
      await userResolver.assignToManager(testUser.id, testManager.id),
    ).toEqual(userWithManager);
  });

  it('should delete user', async () => {
    userService.delete.mockReturnValue(testUser);

    expect(await userResolver.delete(testUser.id)).toEqual(testUser);
  });
});
