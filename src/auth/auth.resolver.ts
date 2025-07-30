import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService){}

    @Mutation(()=> User)
    signUp(@Args('input') input: CreateUserInput){
        return this.authService.registerUser(input)
    }
}
