import FirebaseAdmin from 'firebase-admin';
import { join } from 'path';
const serviceAccount = require(join(process.cwd(), './gu-id-potal-dev-firebase-admin.json'));

export const databaseProviders = [
  {
    provide: 'FIRESTORE_CONNECTION',
    useFactory: () => {
      if ( FirebaseAdmin.apps.length == 0 ) {
        FirebaseAdmin.initializeApp({
          credential: FirebaseAdmin.credential.cert(serviceAccount)
        });
      }

      return FirebaseAdmin.firestore();
    }
  },
];
