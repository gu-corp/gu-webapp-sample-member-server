import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DateScalar } from '../../common/scalars/date.scalar';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { UserProfileCollection } from './datasource/user-profile-collection'
import { databaseProviders } from '~/common/firestore/database.providers';

@Module({
  providers: [
    ProfileResolver, 
    ProfileService, 
    DateScalar, 
    UserProfileCollection,
     ...databaseProviders,
  ],
  exports: [...databaseProviders],
})
export class ProfileModule {}
