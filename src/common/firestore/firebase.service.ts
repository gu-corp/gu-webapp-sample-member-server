import FirebaseAdmin from 'firebase-admin';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  constructor(configService: ConfigService) {
    if (FirebaseAdmin.apps.length == 0) {
      FirebaseAdmin.initializeApp({
        credential: FirebaseAdmin.credential.cert(
          configService.get<string>('firebaseAdmin.serviceAccount'),
        ),
      });
    }
  }

  firestore() {
    return FirebaseAdmin.firestore();
  }
}
