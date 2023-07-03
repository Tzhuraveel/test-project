import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Task } from './task.entity';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 45 })
  @Field()
  name: string;

  @CreateDateColumn()
  @Field()
  dateCreated: Date;

  @ManyToOne(() => User, (user) => user.categories, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @OneToMany(() => Task, (task) => task.category, { nullable: true })
  @Field(() => [Task], { nullable: true })
  tasks: Task[];
}
