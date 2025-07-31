import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/auth/guard/gql-jwt/gql-jwt.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.userService.create(createUserInput);
  // }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => User)
  updateUser(
    @Args('id', {type: ()=> Int})id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
