import request from 'supertest';
import { app } from '../../../../app';

const nameCurrentUserRouteV1 = '/v1/current-user';

it('responds with details about the current user', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get(nameCurrentUserRouteV1)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get(nameCurrentUserRouteV1)
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
