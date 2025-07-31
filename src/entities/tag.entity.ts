import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@ObjectType()
@Entity()
export class Tag{

    @Field(()=> Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({unique: true})
    name: string;

    @Field(()=> [Post])
    @ManyToMany(()=> Post, (post)=> post.tags)
    posts: Post[];
}