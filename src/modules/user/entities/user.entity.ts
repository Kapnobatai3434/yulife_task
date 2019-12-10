import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity } from './base.entity';
import { ManagerEntity } from './manager.entity';

@Entity({ name: 'user' })
@Index(['id', 'username'])
@ObjectType()
export class UserEntity extends BaseEntity {
  @Field(type => ManagerEntity, { nullable: true })
  @ManyToOne(
    () => ManagerEntity,
    manager => manager.subordinates,
  )
  @JoinColumn()
  manager?: ManagerEntity;
}
