import { Post } from '../entities/post.entity';
import { Profile } from "../entities/profile.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from '../entities/user.entity';
import { Tag } from '../entities/tag.entity';
import { faker } from '@faker-js/faker';

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

        const profileFactory = await factoryManager.get(Profile);
        console.log("Seeding profile.....");
        const profiles = await profileFactory.saveMany(5);

        const UserFactory = factoryManager.get(User);
        console.log("Seeding users.....");
        const users = await Promise.all(
            Array(5)
            .fill('')
            .map(async(_, i)=>{
                const user = await UserFactory.make({
                    profile: Promise.resolve(profiles[i]),
                });
                return user;
            })
        );
        const userRepo = dataSource.getRepository(User);
        await userRepo.save(users);

        const postFactory = await factoryManager.get(Post);
        console.log("Seeding post and profile......");

        const posts = await Promise.all(
            Array(10)
            .fill('')
            .map(async()=>{
                const post = await postFactory.make({
                    user: Promise.resolve(faker.helpers.arrayElement(users)),
                    tags: Promise.resolve([faker.helpers.arrayElement(tag)]),
                });
                return post;
            })
        );

        const postRepo = dataSource.getRepository(Post);
        await postRepo.save(posts);
        
        
        
    }
}