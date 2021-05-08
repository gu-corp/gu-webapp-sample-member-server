import { Injectable, NotFoundException, Inject, Redirect } from '@nestjs/common';
import { NewProfileInput } from './dto/new-profile.input';
import { ListProfileArgs } from './dto/list-profile.args';
import { Profile } from './models/profile.model'
import { UserProfileCollection } from './datasource/user-profile-collection';

@Injectable()
export class ProfileService {
  private _db;
  
  constructor(
    private readonly userProfileCollection: UserProfileCollection    
  ) {
  };

  /**
   * Create new profile associate with specified uid
   * @param data Input data from client
   * @returns Created profile
   */
  async upsesrtProfile(data: NewProfileInput): Promise<Profile> {
    const profile: Profile = Object.assign(data, { createdDate: new Date(Date.now())})
    profile.createdDate = new Date(Date.now());
    console.log(profile);
    return await this.userProfileCollection.upsesrtProfile(profile);
  }

  async findOneById(uid: string): Promise<Profile> {
    return await this.userProfileCollection.findOneById(uid);
  }

  async findAll(listProilfeArgs: ListProfileArgs): Promise<Profile[]> {
    listProilfeArgs.skip
    return undefined;
  }

  /**
   * Remove User Profile from UserProfileCollection
   * @param uid Specify uid which to remove
   * @returns Return deleted uid
   */
  async disableProfile(uid: string): Promise<boolean> {
    try {
      return await this.userProfileCollection.disableProfile(uid);
    } catch ( err ) {
      throw new Error(`Can not remove specified profile of uid ${uid}`);
    }
  }
}
