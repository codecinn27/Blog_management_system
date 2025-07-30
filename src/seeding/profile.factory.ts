import { faker } from "@faker-js/faker";
import { Profile } from "../entities/profile.entity";
import { setSeederFactory } from "typeorm-extension";

export const ProfileFactory = setSeederFactory(Profile, ()=>{
    const profile = new Profile();
    profile.bio = faker.person.bio();
    profile.avatar = faker.image.avatar();

    return profile;
})