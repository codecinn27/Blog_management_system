import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  username: string;

  @IsString()
  @IsEmail()
  @Field()
  email: string;

  // @isEnumDeclaration(Role)
  // @Field(()=> Role)
  // role: Role;

  @Field()
  @IsString()
  @MinLength(3)
  password: string
}
