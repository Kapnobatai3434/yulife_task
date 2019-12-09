import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@ObjectType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  readonly id: string;

  @Column('text')
  @Field()
  readonly name: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Field()
  readonly username: string;

  @Column('text')
  password: string;

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
