import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { Repository } from 'typeorm';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}
    async registerUser(input: CreateUserInput){
        const hashedPassword = await hash(input.password);
        const newUser = this.userRepo.create({
            ...input,
            password: hashedPassword,
        });
        return await this.userRepo.save(newUser);
        // throw new Error('Method not implemented');
    }
}
