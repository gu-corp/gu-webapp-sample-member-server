import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { PassportFirebaseStrategy } from './strategy/firebase-strategy';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  PassportFirebaseStrategy,
  'firebase',
) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  // validate(token) {
  //   return auth()
  //     .verifyIdToken(token, true)
  //     .catch((err) => {
  //         console.log(err);
  //         throw new UnauthorizedException();
  //     });
  // }
}
