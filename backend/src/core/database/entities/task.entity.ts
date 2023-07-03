import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from './category.entity';

@ObjectType()
@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int, {})
  id: number;

  @Column({ type: 'varchar', length: 35 })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  dateStart?: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  dateEnd?: Date;

  @ManyToOne(() => Category, (category) => category.tasks, {
    onDelete: 'CASCADE',
  })
  @Field(() => Category)
  category: Category;
}
