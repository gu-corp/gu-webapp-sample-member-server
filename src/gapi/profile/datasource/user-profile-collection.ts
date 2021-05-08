/**
 * DataSource class for UserCollection 
 */
import { Injectable, Inject } from '@nestjs/common';
import firebase from 'firebase';
import FirebaseAdmin from 'firebase-admin';
import { join } from 'path';
import * as autoBind from 'auto-bind';
import { Profile } from '../models/profile.model'
import { toDocument, toProfile, UserProfileDocument } from './user-profile-document';

const serviceAccount = require(join(process.cwd(), './gu-id-potal-dev-firebase-admin.json'));

@Injectable()
export class UserProfileCollection {

  private _db: FirebaseFirestore.Firestore;

  constructor(
    @Inject('FIRESTORE_CONNECTION') db
    )
  {
    this._db = db;
    autoBind(this);
  }

  public async upsesrtProfile(profile: Profile): Promise<Profile> {
    // Logic
    const docRef = this._db.collection('users').doc(profile.uid);

    // Firestore does not accept firestore timestamp, so set profile 
    const profileDoc = toDocument(profile);
    const result = await docRef.set(profileDoc);

    return this.findOneById(profile.uid);
  }

  public async isProfileExist(uid: string): Promise<boolean> {
    const userRef = await this._db.collection('users').doc(uid);
    const doc = await userRef.get();
    return doc.exists;
  }

  public async findOneById(uid: string): Promise<Profile> {
    const userRef = await this._db.collection('users').doc(uid);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      throw new Error(`No such document with ${uid}`);
    }
    return toProfile(snapshot.data());
  }

  public async findAll(): Promise<Profile[]> {
    const userRef = await this._db.collection('users');
    const snapshot = await userRef.where('isDeleted', '==', false).get();
    if (!snapshot.empty) {
      // No matching documents
      return [];
    }

    let profiles: Profile[] = [];

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      profiles.push(toProfile(doc))
    });
    return profiles;
  }

  public async disableProfile(uid: string): Promise<boolean> {
    // Logic
    const docRef = this._db.collection('users').doc(uid);

    // Firestore does not accept firestore timestamp, so set profile 
    const result = await docRef.set({
      isDeleted: false
    });
    return true;
  }

  /**
   * Remove User Profile from UserProfileCollection
   * @param uid Specify uid which to remove
   * @returns Return deleted uid
   */
  public async deleteProfile(uid: string): Promise<string> {
    const res = await this._db.collection('users').doc(uid).delete();
    return uid;
  }


}