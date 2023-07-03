import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { EUserRoles } from '../../../modules/users/model/enum';
import { Category } from './category.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Field()
  name: string;

  @Column({ type: 'varchar' })
  @Field()
  password: string;

  @Column({ type: 'varchar', default: EUserRoles.user, length: 15 })
  @Field({ defaultValue: EUserRoles.user })
  role: EUserRoles;

  @OneToMany(() => Category, (category) => category.user, { nullable: true })
  @Field(() => [Category], { nullable: true })
  categories?: Category[];
}
