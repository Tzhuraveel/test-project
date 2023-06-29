import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EUserRoles } from '../../../modules/users/model/enums';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  name: string;

  @Column({ type: 'varchar' })
  @Field()
  password: string;

  @Column({ type: 'varchar', default: EUserRoles.user, length: 15 })
  @Field({ defaultValue: EUserRoles.user })
  role: EUserRoles;
}
