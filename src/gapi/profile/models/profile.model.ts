import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NewProfileInput } from '../dto/new-profile.input';
import { IsOptional, Length, MaxLength } from 'class-validator';

@ObjectType()
export class Profile {
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
  @IsOptional()
  @MaxLength(100)
  address2: string;

  @Field((type) => Date)
  @MaxLength(50)
  birthDay: Date;

  @Field((type) => [String])
  ethereumAddress: string[];

  @Field((type) => Date)
  createdDate: Date;
}
