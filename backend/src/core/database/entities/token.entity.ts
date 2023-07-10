import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar' })
  @Field()
  accessToken: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  userId: number;

  @CreateDateColumn()
  @Field()
  dateCreated: Date;
}
