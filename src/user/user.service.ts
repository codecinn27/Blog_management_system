import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>)
  {}
  
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find({
      relations: ['profile', 'posts'], // using eager load realted data
    })
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOneOrFail({
      where: {id},
      relations: ['profile', 'posts'],
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userRepo.findOneByOrFail({id});
    return await this.userRepo.save(
      new User(Object.assign(user, updateUserInput)),
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
