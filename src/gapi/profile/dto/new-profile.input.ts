import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewProfileInput {
  @Field()
  @MaxLength(30)
  uid: string;

  @Field()
  @MaxLength(100)
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(100)
  middleName?: string;

  @Field()
  @MaxLength(100)
  lastName: string;

  @Field()
  @MaxLength(100)
  country: string;

  @Field()
  @MaxLength(50)
  postalCode: string;

  @Field()
  @MaxLength(100)
  state: string;

  @Field()
  @MaxLength(100)
  city: string;

  @Field()
  @MaxLength(100)
  address1: string;

  @Field()
  @MaxLength(100)
  address2: string;

  @Field(type => GraphQLISODateTime)
  birthDay: Date;

  @Field(type => [String])
  ethereumAddress: string[];
}
