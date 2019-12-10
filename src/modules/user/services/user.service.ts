import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities';
import { CreateUserDto } from '../dto';
import { UserType } from '../interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.repo.find({ relations: ['manager', 'subordinates'] });
  }

  async create(data: Partial<CreateUserDto>): Promise<UserEntity> {
    const { username } = data;
    let user = await this.repo.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.repo.create(data);
    if (data.managerId) {
      user.manager = await this.repo.findOne(data.managerId);
    }
    const documentsCount = await this.repo.count();
    if (documentsCount === 0) {
      user.type = UserType.Admin;
    }
    await this.repo.save(user);

    return user;
  }

  async login({ username, password }): Promise<UserEntity> {
    const user = await this.repo.findOne(
      { username },
      { relations: ['manager', 'subordinates'] },
    );
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  async findOneById(id: string): Promise<UserEntity> {
    const user = await this.repo.findOne(id, {
      relations: ['manager', 'subordinates'],
    });
    if (!user) {
      throw new HttpException('No user in the DB!', HttpStatus.NO_CONTENT);
    }

    return user;
  }

  async delete(id: string): Promise<any> {
    try {
      return this.repo.delete(id);
    } catch (e) {
      throw new HttpException(
        'Failed to delete the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async promote(id: string): Promise<UserEntity> {
    const user = await this.repo.findOne(id);

    if (user.type !== UserType.User) {
      throw new HttpException(
        'This user is already a manager!',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }

    user.type = UserType.Manager;

    return this.repo.save(user);
  }

  async assignToManager(
    userId: string,
    managerId: string,
  ): Promise<UserEntity> {
    const user = await this.repo.findOne(userId, {
      relations: ['manager', 'subordinates'],
    });
    if (!user) {
      throw new HttpException('No user in the DB!', HttpStatus.NO_CONTENT);
    }
    if (user.type !== UserType.User) {
      throw new HttpException(
        'User can not be assigned to a manager',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    if (user.manager) {
      throw new HttpException(
        'User already has a manager',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    const manager = await this.repo.findOne(managerId);
    if (!manager) {
      throw new HttpException('No manager in the DB!', HttpStatus.NO_CONTENT);
    }
    if (manager.type === UserType.User) {
      throw new HttpException(
        'User can not be assigned to not another user',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }

    user.manager = manager;
    return this.repo.save(user);
  }
}
