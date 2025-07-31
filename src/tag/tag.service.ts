import { Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/entities/tag.entity';

@Injectable()
export class TagService {

  constructor(@InjectRepository(Tag) private readonly tagRepo: Repository<Tag>){}
  async create(name: string): Promise<Tag> {
    const tag = this.tagRepo.create({name});
    return this.tagRepo.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepo.find({relations: ['posts']});
  }

  async findOne(id: number): Promise<Tag> {
    return await this.tagRepo.findOneOrFail({
      where:{id},
      relations: ['posts'],
    })
  }

  // update(id: number, updateTagInput: UpdateTagInput) {
  //   return `This action updates a #${id} tag`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tag`;
  // }
}
