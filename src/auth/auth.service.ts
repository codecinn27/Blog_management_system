import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { Repository } from 'typeorm';
import { hash, verify } from 'argon2';
import { SignInInput } from './dto/signIn.input';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './entities/auth-payload';
import { Profile } from 'src/entities/profile.entity';
import { JwtUser } from './types/jwt-user';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>,
    private readonly jwtService:JwtService){}
    async registerUser(input: CreateUserInput){
        const hashedPassword = await hash(input.password);
        const newUser = this.userRepo.create({
            ...input,
            password: hashedPassword,
            profile: {
                bio:'',
                avatar:''
            }as Profile,
        });
        return await this.userRepo.save(newUser);
        // throw new Error('Method not implemented');
    }

    async validateLocalUser({username, password}: SignInInput){
        const user = await this.userRepo.findOneByOrFail({username})

        const passwordMatched = await verify(user.password, password); //to really compare both hash and original password, await is mandatory
        if(!passwordMatched)
            throw new UnauthorizedException('Invalid Credentials');

        return user;
    }

    async generateToken(userId: number){
        const payload:AuthJwtPayload = {
            sub: {
                userId,
            },
        };
        const accessToken = await this.jwtService.signAsync(payload); // no need to configure the expire time and jwt secret key as this is done at the auth.module using config service
        return {accessToken};
    }


    async login(user: User): Promise<AuthPayload>{
        const {accessToken} = await this.generateToken(user.id);
        return {
            userId: user.id,
            accessToken,
        };

    }

    async validateJwtUser(userId: number){
        const user = await this.userRepo.findOneByOrFail({id: userId});
        const jwtUser: JwtUser = {
            userId: user.id,
        };
        return jwtUser;
    }
}
