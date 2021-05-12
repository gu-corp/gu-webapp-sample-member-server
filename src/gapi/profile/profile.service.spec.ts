import { Test } from '@nestjs/testing';
import { NewProfileInput } from './dto/new-profile.input';
import { DateScalar } from '../../common/scalars/date.scalar';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { UserProfileCollection } from './datasource/user-profile-collection'
import { FirebaseService } from '~/common/firestore/firebase.service';

describe('CatsController', () => {
  let _profileService: ProfileService;
  let _userProfileCollection: UserProfileCollection;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ProfileResolver, ProfileService, DateScalar, UserProfileCollection, FirebaseService],
    }).compile();

    _profileService = moduleRef.get<ProfileService>(ProfileService);
    _userProfileCollection = moduleRef.get<UserProfileCollection>(UserProfileCollection);
  });

  describe('upsertProfile', () => {
    test('should upsert profile correctly', async () => {
      let data: NewProfileInput = {
        uid: 'testuid',
        firstName: 'Ada',
        middleName: '',
        lastName: 'Lovelace',
        country: 'Japan',
        postalCode: '1500031',
        state: 'Tokyo',
        city: 'Shibuya-ku',
        address1: 'Sakuragaoka-chi',
        address2: '',
        birthDay: new Date('1977-12-20T15:00:00.000Z'),
        ethereumAddress: [
          '0x131b395794e487b564fd86f5872727fc44544d23'
        ]
      }
      await _profileService.upsesrtProfile(data);
      const result = await _profileService.findOneById(data.uid);
      expect(result).toEqual(data);

      _userProfileCollection.deleteProfile(data.uid);
    });
  });
});