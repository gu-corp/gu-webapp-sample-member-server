import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DateScalar } from '../../common/scalars/date.scalar';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { UserProfileCollection } from './datasource/user-profile-collection';
import { FirebaseService } from '~/common/firestore/firebase.service';

@Module({
  providers: [
    ProfileResolver,
    ProfileService,
    DateScalar,
    UserProfileCollection,
    FirebaseService,
  ],
  exports: [FirebaseService],
})
export class ProfileModule {}
