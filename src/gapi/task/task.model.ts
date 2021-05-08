import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@ObjectType()
export class Task {

  @Field()
  id: number;

  @Field()
  @MaxLength(100)
  name: string; 
}
