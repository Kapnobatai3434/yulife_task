import { UserType } from '../interfaces';

export const userFixture = (overrides = {}) => ({
  name: 'Ivan',
  username: 'fakeUsername',
  id: 'bc08a057-57fd-410c-8d3d-6669c177a70a',
  password: 'fake',
  managerId: '',
  type: UserType.User,
  comparePassword: jest.fn(),
  ...overrides,
});
export const managerFixture = (overrides = {}) => ({
  name: 'Ivan2',
  username: 'fakeUsername2',
  id: 'bc08a057-57fd-410c-8d3d-6669c177fake',
  password: 'fake2',
  managerId: '',
  type: UserType.Manager,
  comparePassword: jest.fn(),
  ...overrides,
});
export const repositoryMockFactory: jest.Mock<
  {
    find: jest.Mock<any, any>;
    findOne: jest.Mock<any, any>;
    save: jest.Mock<any, any>;
    update: jest.Mock<any, any>;
    create: jest.Mock<any, any>;
    count: jest.Mock<any, any>;
    delete: jest.Mock<any, any>;
  },
  any[]
> = jest.fn(() => ({
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  count: jest.fn(),
  delete: jest.fn(),
}));
export const serviceMockFactory: jest.Mock<
  {
    findAll: jest.Mock<any, any>;
    create: jest.Mock<any, any>;
    login: jest.Mock<any, any>;
    findOneById: jest.Mock<any, any>;
    delete: jest.Mock<any, any>;
    promote: jest.Mock<any, any>;
    assignToManager: jest.Mock<any, any>;
  },
  any[]
> = jest.fn(() => ({
  findAll: jest.fn(),
  create: jest.fn(),
  login: jest.fn(),
  findOneById: jest.fn(),
  delete: jest.fn(),
  promote: jest.fn(),
  assignToManager: jest.fn(),
}));
export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
