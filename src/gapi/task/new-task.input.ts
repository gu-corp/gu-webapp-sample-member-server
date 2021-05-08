import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewTaskInput {
  @Field()
  @MaxLength(100)
  name: string;
}
