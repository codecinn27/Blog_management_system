import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from './post.entity';

@ObjectType()
@Entity()
export class User {

  constructor(partial? : Partial<User>){
    Object.assign(this, partial)
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique: true})
  username: string;

  @Field()
  @Column()
  email: string;

  @Column({nullable: true})
  password: string;

  @Field(()=> Profile)
  @OneToOne(()=> Profile, (profile)=> profile.user, {cascade: true})
  @JoinColumn()
  profile: Promise<Profile>;

  @Field(()=> [Post])
  @OneToMany(()=> Post, (post)=> post.user)
  posts: Promise<Post[]>;
}
