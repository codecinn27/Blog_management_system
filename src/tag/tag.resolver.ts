import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from 'src/entities/tag.entity';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  async createTag(@Args('createTagInput') createTagInput: CreateTagInput): Promise<Tag> {
    return this.tagService.create(createTagInput.name);
  }

  @Query(() => [Tag], { name: 'tag' })
  async findAll() {
    return await this.tagService.findAll();
  }

  @Query(() => Tag)
  getTag(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.findOne(id);
  }

  // @Mutation(() => Tag)
  // updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
  //   return this.tagService.update(updateTagInput.id, updateTagInput);
  // }

  // @Mutation(() => Tag)
  // removeTag(@Args('id', { type: () => Int }) id: number) {
  //   return this.tagService.remove(id);
  // }
}
