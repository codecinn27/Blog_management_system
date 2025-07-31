import { ProfileFactory } from './profile.factory';
import { UserFactory } from './user.factory';
import { Post } from '../entities/post.entity';
import { Profile } from "../entities/profile.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from '../entities/user.entity';
import { Tag } from '../entities/tag.entity';
import { faker } from '@faker-js/faker';
import { profile } from 'console';

export class MainSeeder implements Seeder{

    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager):
    Promise<any>{

        const tagRepo = dataSource.getRepository(Tag);
        const tag = await tagRepo.save([
            {name: "Tech"},
            {name: "Sports"},
            {name: "Art"},
            {name: "Music"},
        ])

        const userFactory = await factoryManager.get(User);
        const profileFactory = await factoryManager.get(Profile);
        console.log("Seeding users and profiles.....");

        const users: User[] = [];
        
        const usersWithProfiles = await Promise.all(
            Array(5)
            .fill('')
            .map(async()=>{
                const profile = await profileFactory.make();

                const user = await userFactory.make({
                    profile: profile
                });
                users.push(user);

                return user;
            })
        );

        const userRepo = dataSource.getRepository(User);
        await userRepo.save(usersWithProfiles);

        const postFactory = await factoryManager.get(Post);
        console.log("Seeding post and profile......");

        const posts = await Promise.all(
            Array(10)
            .fill('')
            .map(async()=>{
                const post = await postFactory.make({
                    user: faker.helpers.arrayElement(users),
                    tags: [faker.helpers.arrayElement(tag)],
                });
                return post;
            })
        );

        const postRepo = dataSource.getRepository(Post);
        await postRepo.save(posts);
        
        
        
    }
}