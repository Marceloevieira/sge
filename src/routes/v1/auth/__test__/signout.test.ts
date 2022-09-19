import request from 'supertest';
import { app } from '../../../../app';

const nameSignupRouteV1 = '/v1/signup';
const nameSignoutRouteV1 = '/v1/signout';

it('clears the cookie after signing out', async () => {
  await request(app)
    .put(nameSignupRouteV1)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .put(nameSignoutRouteV1)
    .send({})
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
