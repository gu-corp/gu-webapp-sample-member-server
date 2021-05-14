// Implementation of TestStrategy passport module
// Copyright(c) G.U.Labs Corporation

import express from 'express';
import { Strategy } from 'passport';
import firebaseAdmin from 'firebase-admin';

/**
 * Test class is test implementation of passport.Stratege.
 * @auther Hidekazu Kondo
 */
export class PassportFirebaseStrategy extends Strategy {
  constructor() {
    super();

    if (firebaseAdmin.apps.length === 0) {
      const serviceAccount: firebaseAdmin.ServiceAccount = {
        projectId: 'gu-id-potal-dev',
        privateKey:
          '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDOjrOwLRvdHkv1\n9RfuUe+Hqu2czVVWuq5SUG6NI4EM8k4M0pFv/6knfgcFITxXxdkzj/ppz1j+OmoD\nHi0U8lJ8q/6zM92dobEbu0rXc9Fispw+Ze125kaFfGftqUct1KrE9+TwEVHZjOr0\noSGK95qsr+ymexdjwOpJtKklw1kjogphMJlBsgSsJrY4dLecw+QH+SB67+nbI1GD\nTQHXDjUfvWqoVWtNyz5Tq/zJb4Mll5jmEyDNXzkTOb2fRzhHCLZvlQAjrdXxjtBA\ntKlUXmgJANDd6wk6XVgG4Fw+OsaTuLJylsdL3xHXGj5oxsnt2AxxnBESKUTA6wPX\nEes6F5ZxAgMBAAECggEACiOYM4V4UtuZCxACgmXSWBaKYrYzyl3AHy1gatRHgjQd\n44xdvBmYoxYRKEXeD1koaOr4JdPaLIL/p4rmd7rwFHtxFXjuF73rSpcgRKiESnfl\n2lyAmjOyGhzt4U0sD7Zq4j+glM3l1pPfp93FrquKI7BAQZkE0DZEzdTE0YQn8ssr\nq9fNjZdATTK0KsQTms+bqKnJfo8VANYDEAD7jx3Az1f/fNrgN00Zx5fvKvx9x6g4\n8GF8Cgxk7+79pwt4/AQsmgIQRIUPchO3z/Vj/lTauDBoOE4wEJcw/o+yEb0BoNZk\nstAAMe4IvVrXK3Z0GjgrRkGX7Z/OIa3hXPPUudIyYQKBgQDmmkLSvm1p4OVjMuWr\nQj655zpdgG4audvpqgeuNKmuo2+hV+WzOnRog6Z9wGm6xrRPosIn1AnUBK4z0jef\nERd0gxI2vIF1BMHvLaIb8vIPZFLC1F0vlQ4XyTldOio03VrbkL3hrVm+LXFzwUES\nzk0wDaN1ChYuAu7dZtPDLkJHUQKBgQDlTn+RLHAwBe3fLqlnc06UtQPDiG4E1RIy\nBv7D4Jkz0gK1DuTsSj5GE+zJPmrPyNeCxTMvxXLR9YxSfvMJjU6rLVwDz+w0v3KA\nXL3GWzGA7nqqA8Wnukm9Ap1XgLgIkhyaEAqz5d/y1s8XiIBsUf+nORBVjBUJvf+6\nUvZWWVbVIQKBgQCm06rMM5+MHXtVzJiC0SX37+Q1iJgfFZ6W6L8ttEOdZ/d2TdSL\nWRqmEbf8+ZqD2QTRJ/o2PhvuGoS8ULSUixTg4YHnv3AYbByxH95LQfMEV5vX/zJ7\nHeZYJuctHssx+4Gjno8AGRz3jICrMYAWTtFglj1OisGI/+42lhFU/r5MQQKBgBDG\n9IhvoumwlV3d8SETi61PrS3SPpJ18HXekydLuInVFMOgillLeVDxRkLXIUOAo1v7\nB6q4HJWGDLVAepG5WAcoM3JH9TVKyJrhrjTkGTQgvrLPwddqxthgZ5iuX0ipQBR5\nlf7hk8gVtWM4ZoUGXtkiULKhpCxpTVuZlFJvCO5hAoGAb0PesOez5801e6d6fd+K\nC3ZnvI7uWfWSc8I7X5BVwF0zYIyzvvBaQMCdK3idnwTFSiFEGJNfYszFWXF0dN9L\n1KQ4Db8HlNpTSlXrZbdVS0uDheMBX/8kLesg1WmSeJm/X8QnL8OmBDh3xtDEjyBz\n3ttM6J6ryfg2UZqoCbZPZ/w=\n-----END PRIVATE KEY-----\n',
        clientEmail:
          'firebase-adminsdk-e5czy@gu-id-potal-dev.iam.gserviceaccount.com',
      };

      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: 'https://gu-identity.firebaseio.com',
      });
    }
  }
  /**
   * Performs authentication for the request.
   * @param req The request to authenticate.
   * @param options Options passed to the strategy.
   */
  authenticate(
    req: express.Request,
    options: {
      checkRevoked: boolean;
    },
  ): void {
    // Need to use express-bearer-token middilware when use req.token for Bearer token
    const token = req.token;
    if (!token) {
      // const sessionCookie = req.cookies.session || '';
      // console.log(`Session Cookie:  ${sessionCookie}`)
      // firebaseAdmin
      //   .auth()
      //   .verifySessionCookie(sessionCookie).then(user => {
      //   req.user = user;
      // }).catch( err => {
      //   console.log(err);
      //   this.fail(403);
      // });
      this.fail(403);
    } else {
      // Verify token
      const checkRevoked = options.checkRevoked || false;
      firebaseAdmin
        .auth()
        .verifyIdToken(token, checkRevoked)
        .then((decodedToken) => {
          // Get user from token.uid
          firebaseAdmin
            .auth()
            .getUser(decodedToken.uid)
            .then((user) => {
              user = Object.assign(user, { token: token });
              this.success(user);
            })
            .catch((err) => {
              this.error(err);
            });
        })
        .catch((err) => {
          this.fail(err, 401);
        });
    }
  }
}
