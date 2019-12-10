import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity({ name: 'user' })
@Index(['id', 'username'])
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  readonly id: string;

  @Column('text')
  @Field()
  name: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Field()
  username: string;

  @Column('text')
  private password: string;

  @Column({ type: 'boolean', default: true })
  @Field()
  readonly isActive: boolean;

  @Column({ type: 'boolean', default: false })
  @Field()
  readonly isArchived: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field()
  readonly createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field()
  readonly updatedAt: Date;

  @Column({ type: 'text', default: 'user' })
  @Field()
  type: string;

  @Field(type => UserEntity, { nullable: true })
  @ManyToOne(
    () => UserEntity,
    user => user.subordinates,
  )
  @JoinColumn()
  manager?: UserEntity;

  @Field(type => UserEntity, { nullable: true })
  @OneToMany(
    () => UserEntity,
    user => user.manager,
    { cascade: true },
  )
  @JoinColumn()
  subordinates?: UserEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }

  @Field({ nullable: true })
  private get token(): string {
    const { id, username } = this;

    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      { expiresIn: '15m' },
    );
  }
}
