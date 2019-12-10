import { Column, Entity, Index, JoinColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'manager' })
@Index(['id', 'username'])
@ObjectType()
export class ManagerEntity extends BaseEntity {
  @Field(type => UserEntity, { nullable: true })
  @OneToMany(
    () => UserEntity,
    user => user.manager,
    { cascade: true },
  )
  @JoinColumn()
  subordinates?: UserEntity[];
}
