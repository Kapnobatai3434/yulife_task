import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity } from './base.entity';
import { ManagerEntity } from './manager.entity';

@Entity({ name: 'user' })
@Index(['id', 'username'])
@ObjectType()
export class UserEntity extends BaseEntity {
  @ManyToOne(
    () => ManagerEntity,
    manager => manager.subordinates,
  )
  @Field(type => ManagerEntity, { nullable: true })
  manager?: ManagerEntity;
  @Column({ nullable: true })
  managerId: string;
}
