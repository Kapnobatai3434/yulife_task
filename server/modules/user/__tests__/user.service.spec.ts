import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { UserService } from '../services';
import { UserEntity } from '../entities';
import { UserType } from '../interfaces';
import {
  managerFixture,
  MockType,
  repositoryMockFactory,
  userFixture,
} from './fixtures';

describe('UserService', () => {
  let userService;
  let userRepository: MockType<Repository<UserEntity>>;
  let testUser;
  let testManager;

  beforeEach(async () => {
    jest.restoreAllMocks();
    testUser = userFixture();
    testManager = managerFixture();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    userService = module.get(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a new user as admin', async () => {
    const adminUser = userFixture({ type: UserType.Admin });
    userRepository.findOne.mockReturnValue(null);
    userRepository.count.mockReturnValue(0);
    userRepository.create.mockReturnValue(adminUser);
    userRepository.save.mockReturnValue(adminUser);
    const user = await userService.create(testUser);

    expect(user).toEqual(adminUser);
  });

  it('should create a new user assigned to a manager', async () => {
    const userWithManager = userFixture({ manager: testManager });
    userRepository.findOne
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(testManager);
    userRepository.count.mockReturnValue(1);
    userRepository.create.mockReturnValue(userWithManager);
    userRepository.save.mockReturnValue(userWithManager);
    const user = await userService.create(testUser);

    expect(user).toEqual(userWithManager);
  });

  it('should show an error if user already exists', done => {
    userRepository.findOne.mockReturnValue(testUser);

    userService
      .create(testUser)
      .then(() => done.fail('Should return HttpException User already exists'))
      .catch(error => {
        expect(error.status).toBe(405);
        expect(error.message).toBe('User already exists');
        done();
      });
  });

  it('should return all users', async () => {
    userRepository.find.mockReturnValue([testUser]);
    const users = await userService.findAll();

    expect(users).toEqual([testUser]);
  });

  it('should return logged user', async () => {
    userRepository.findOne.mockReturnValue(testUser);
    testUser.comparePassword.mockReturnValue(true);

    const user = await userService.login({
      username: testUser.username,
      password: testUser.password,
    });

    expect(user).toEqual(testUser);
  });

  it('should show an error if password did not match', done => {
    userRepository.findOne.mockReturnValue(testUser);
    testUser.comparePassword.mockReturnValue(false);

    userService
      .login(testUser)
      .then(() =>
        done.fail('Should return HttpException Invalid username/password'),
      )
      .catch(error => {
        expect(error.status).toBe(405);
        expect(error.message).toBe('Invalid username/password');
        done();
      });
  });

  it('should find user by user id', async () => {
    userRepository.findOne.mockReturnValue(testUser);

    expect(await userService.findOneById(testUser.id)).toEqual(testUser);
  });

  it('should show an error if there is not user in the DB', done => {
    userRepository.findOne.mockReturnValue(null);

    userService
      .findOneById(testUser.id)
      .then(() => done.fail('Should return HttpException No user in the DB!'))
      .catch(error => {
        expect(error.status).toBe(204);
        expect(error.message).toBe('No user in the DB!');
        done();
      });
  });

  it('should delete user', async () => {
    userRepository.delete.mockReturnValue(true);

    expect(await userService.delete(testUser.id)).toEqual(true);
  });

  it('should return promoted user', async () => {
    userRepository.findOne.mockReturnValue(testUser);
    const promotedUser = userFixture({
      type: UserType.Manager,
    });
    userRepository.save.mockReturnValue(promotedUser);
    const user = await userService.changeManager(testUser.id);

    expect(user).toEqual(promotedUser);
  });

  it('should show an error if user is already a manager', done => {
    const promotedUser = userFixture({
      type: UserType.Manager,
    });
    userRepository.findOne.mockReturnValue(promotedUser);

    userService
      .changeManager(promotedUser.id)
      .then(() =>
        done.fail(
          'Should return HttpException This user is already a manager!',
        ),
      )
      .catch(error => {
        expect(error.status).toBe(405);
        expect(error.message).toBe('This user is already a manager!');
        done();
      });
  });

  it('should show an error if there is no user in the DB', done => {
    userService
      .assignToManager(testUser.id, testManager.id)
      .then(() => done.fail('Should return HttpException No user in the DB!'))
      .catch(error => {
        expect(error.status).toBe(204);
        expect(error.message).toBe('No user in the DB!');
        done();
      });
  });

  it('should show an error if user is manager', done => {
    userRepository.findOne.mockReturnValue(testManager);

    userService
      .assignToManager(testManager.id, testManager.id)
      .then(() =>
        done.fail(
          'Should return HttpException User can not be assigned to a manager',
        ),
      )
      .catch(error => {
        expect(error.status).toBe(405);
        expect(error.message).toBe('User can not be assigned to a manager');
        done();
      });
  });

  it('should show an error if user already has a manager', done => {
    const userWithManager = userFixture({ manager: testManager });
    userRepository.findOne.mockReturnValue(userWithManager);

    userService
      .assignToManager(userWithManager.id, testManager.id)
      .then(() =>
        done.fail('Should return HttpException User already has a manager'),
      )
      .catch(error => {
        expect(error.status).toBe(405);
        expect(error.message).toBe('User already has a manager');
        done();
      });
  });

  it('should show an error if there is no manager in the DB', done => {
    userRepository.findOne
      .mockReturnValueOnce(testUser)
      .mockReturnValueOnce(null);

    userService
      .assignToManager(testUser.id, testManager.id)
      .then(() =>
        done.fail('Should return HttpException No manager in the DB!'),
      )
      .catch(error => {
        expect(error.status).toBe(204);
        expect(error.message).toBe('No manager in the DB!');
        done();
      });
  });

  it('should show an error if user is being assigned not to manager', done => {
    userRepository.findOne
      .mockReturnValueOnce(testUser)
      .mockReturnValueOnce(testUser);

    userService
      .assignToManager(testUser.id, testUser.id)
      .then(() =>
        done.fail(
          'Should return HttpException User can not be assigned not to a manager',
        ),
      )
      .catch(error => {
        expect(error.status).toBe(405);
        expect(error.message).toBe('User can not be assigned not to a manager');
        done();
      });
  });

  it('should assign user to a manager', async () => {
    const userWithManager = userFixture({ manager: testManager });
    userRepository.findOne
      .mockReturnValueOnce(testUser)
      .mockReturnValueOnce(testManager);
    userRepository.save.mockReturnValue(userWithManager);

    const user = await userService.assignToManager(testUser.id, testManager.id);
    expect(user).toEqual(userWithManager);
  });
});
