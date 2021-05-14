import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Subscription,
  Parent,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewProfileInput } from './dto/new-profile.input';
import { ListProfileArgs } from './dto/list-profile.args';
// import { Profile } from './models/profile.model';
import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';

const pubSub = new PubSub();

@Resolver((of) => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query((returns) => Profile)
  async getProfile(@Args('uid') uid: string): Promise<Profile> {
    const profile = await this.profileService.findOneById(uid);
    if (!profile) {
      throw new NotFoundException(`Specified uid not found ${uid}`);
    }
    return profile;
  }

  @Query((returns) => [Profile])
  listProfiles(@Args() profileArgs: ListProfileArgs): Promise<Profile[]> {
    return this.profileService.findAll(profileArgs);
  }

  @Mutation((returns) => Profile)
  async upsertProfile(
    @Args('newProfileData') newProfileInput: NewProfileInput,
  ): Promise<Profile> {
    if (!newProfileInput.birthDay) {
      throw new Error('Birth dai : ' + newProfileInput.birthDay);
    }
    const profile = await this.profileService.upsesrtProfile(newProfileInput);
    pubSub.publish('profileAdded', { profileAdded: profile });
    return profile;
  }

  @Mutation((returns) => Boolean)
  async disableProfile(@Args('uid') uid: string) {
    return this.profileService.disableProfile(uid);
  }

  @Subscription((returns) => Profile)
  profileAdded() {
    return pubSub.asyncIterator('profileAdded');
  }

  profileRemoved() {
    return pubSub.asyncIterator('profileRemoved');
  }
}
