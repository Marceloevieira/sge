import request from 'supertest';
import { app } from '../../../../app';

const nameSigninRouteV1 = '/v1/signin';
const nameSignupRouteV1 = '/v1/signup';

it('fails when a email that does not exist in supplied', async () => {
  await request(app)
    .post(nameSigninRouteV1)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password in supplied', async () => {
  await request(app)
    .put(nameSignupRouteV1)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post(nameSigninRouteV1)
    .send({
      email: 'test@test.com',
      password: 'asdasdasdas',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .put(nameSignupRouteV1)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post(nameSigninRouteV1)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
