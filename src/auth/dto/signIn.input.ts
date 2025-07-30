import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, MinLength } from "class-validator";

@InputType()
export class SignInInput{
    @Field()
    @IsString()
    username: string;

    @Field()
    @IsString()
    @MinLength(1)
    password: string;

}