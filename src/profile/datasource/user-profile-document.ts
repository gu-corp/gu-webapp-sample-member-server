import FirebaseAdmin from 'firebase-admin';

import { Profile } from '../models/profile.model'

export interface UserProfileDocument {
  uid: string;
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  postalCode: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  birthDay: FirebaseAdmin.firestore.Timestamp;
  ethereumAddress: string[];
  createdDate: FirebaseAdmin.firestore.Timestamp;
  isDeleted: Boolean;
}

export function validate(doc: UserProfileDocument)  {
  // Write Validateions
  
  return true;
}

export function toDocument(profile: Profile): UserProfileDocument {
  return {
    uid: profile.uid,
    firstName: profile.firstName,
    middleName: profile.middleName ? profile.middleName : '',
    lastName: profile.lastName,
    country: profile.country,
    postalCode: profile.postalCode,
    state: profile.state,
    city: profile.city,
    address1: profile.address1,
    address2: profile.address2 ? profile.address2 : '',
    birthDay: FirebaseAdmin.firestore.Timestamp.fromDate(new Date(profile.birthDay)),
    ethereumAddress: profile.ethereumAddress,
    createdDate: FirebaseAdmin.firestore.Timestamp.fromDate(profile.createdDate),
    isDeleted: false
  }
}

export function toProfile(data: FirebaseFirestore.DocumentData): Profile {
  return {
    uid: data.uid,
    firstName: data.firstName,
    middleName: data.middleName ? data.middleName : '',
    lastName: data.lastName,
    country: data.country,
    postalCode: data.postalCode,
    state: data.state,
    city: data.city,
    address1: data.address1,
    address2: data.address2 ? data.address2 : '',
    birthDay: data.birthDay.toDate(),
    ethereumAddress: data.ethereumAddress,
    createdDate: data.createdDate.toDate()
  };
}