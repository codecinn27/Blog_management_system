import { Post } from '../entities/post.entity';
import { faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

export const PostFactory = setSeederFactory(Post, ()=>{
    const post = new Post();
    post.title = `The ${faker.hacker.adjective()} ${faker.hacker.noun()} guide`;
    post.content = faker.lorem.sentence();

    return post;
})