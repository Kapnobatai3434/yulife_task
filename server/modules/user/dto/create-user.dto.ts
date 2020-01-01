import { MaxLength, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { IUser } from '../interfaces';

@InputType()
export class CreateUserDto implements IUser {
  @Field()
  @IsNotEmpty()
  @MaxLength(10)
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}
