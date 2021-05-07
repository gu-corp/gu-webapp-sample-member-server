/**
 * @jest-environment node
 */
import FirebaseAdmin from 'firebase-admin';
import { join } from 'path';
import { Profile } from '../models/profile.model';
import { ProfileModule } from '../profile.module';
import { UserProfileCollection } from './user-profile-collection';

const serviceAccount = require(join(process.cwd(), './gu-id-potal-dev-firebase-admin.json'));


describe('App loader test', () => {
  
  let _uid;
  let _userProfileCollection;

  beforeAll(async() => {
    if ( FirebaseAdmin.apps.length == 0 ) {
      FirebaseAdmin.initializeApp({
        credential: FirebaseAdmin.credential.cert(serviceAccount)
      });
    }

    const db = FirebaseAdmin.firestore();

    _userProfileCollection = new UserProfileCollection(db);
    _uid = 'asdf';
    const profile: Profile = new Profile();
    
    profile.uid = _uid;
    profile.firstName = 'Ada';
    profile.lastName = 'Lovelace';
    profile.country = 'Japan';
    profile.postalCode = '1500031';
    profile.state = 'Tokyo';
    profile.city = 'Shibuya-ku';
    profile.address1 = 'Sakuragaoka-chi';
    // profile.address2 = 'Sakuragaoka-chi';
    profile.birthDay = new Date('1977/12/21');
    profile.ethereumAddress = [
      '0x131b395794e487b564fd86f5872727fc44544d23'
    ];
    profile.createdDate = new Date('2021/02/02 01:22:45');
    const createdProfile = await _userProfileCollection.upsesrtProfile(profile);
  });

  afterAll(async() => {
    await _userProfileCollection.deleteProfile(_uid);
  });

  test('Test findOneById', async() => {
    const profile2 = await _userProfileCollection.findOneById(_uid);
    expect(profile2).toEqual({    
      uid: _uid,
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
      ],
      createdDate: new Date('2021-02-01T16:22:45.000Z')
    })
  });
});