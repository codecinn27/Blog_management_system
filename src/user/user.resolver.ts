import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/auth/guard/gql-jwt/gql-jwt.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { JwtUser } from 'src/auth/types/jwt-user';

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

  @UseGuards(GqlJwtGuard)
  @Query(() => User)
  getUser(@CurrentUser() user: JwtUser) {
    return this.userService.findOne(user.userId);
  }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => User)
  updateUser(
      @CurrentUser() user: JwtUser,
      @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {

    console.log({user});
    return this.userService.update(user.userId, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
