import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ProfileModule } from '~/gapi/profile/profile.module'
import { ProfileService } from '~/gapi/profile/profile.service'
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  let profileService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProfileModule],
    })
      .overrideProvider(ProfileService)
      .useValue(profileService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test(`/GET graphql`, () => {
    return request(app.getHttpServer())
      .get('/graphql')
      .expect(200)
      .expect({
        data: profileService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});