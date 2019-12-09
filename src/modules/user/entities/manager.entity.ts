import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'manager' })
@Index(['id', 'username'])
@ObjectType()
export class ManagerEntity extends BaseEntity {
  @OneToMany(
    () => UserEntity,
    user => user.manager,
    { cascade: ['insert'] },
  )
  @Field(type => UserEntity, { nullable: true })
  subordinates?: UserEntity[];
  @Column({ nullable: true })
  userId: string;
}
