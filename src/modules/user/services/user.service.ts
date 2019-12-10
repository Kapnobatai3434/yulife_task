import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities';
import { CreateUserDto } from '../dto';

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
      user.manager = await this.repo.findOne(data.managerId, {
        relations: ['subordinates'],
      });
    }
    const documentsCount = await this.repo.count();
    if (documentsCount === 0) {
      user.type = 'admin';
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
}
