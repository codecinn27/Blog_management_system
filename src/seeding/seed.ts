import { pgConfig } from "../../db.Config";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { ProfileFactory } from "./profile.factory";
import { UserFactory } from "./user.factory";
import { PostFactory } from "./post.factory";
import { MainSeeder } from "./main.seeder";

const options: DataSourceOptions & SeederOptions ={
    ...pgConfig,
    factories: [ProfileFactory, UserFactory, PostFactory],
    seeds: [MainSeeder],
}

const dataSource = new DataSource(options);
dataSource.initialize().then(async()=>{
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit()
})