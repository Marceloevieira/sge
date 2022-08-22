import request from 'supertest';
import { app } from '../../../../app';

const nameSignupRouteV1 = '/v1/signup';

it('returns a 400 with missing email and password', async () => {
  return request(app).put(nameSignupRouteV1).send({}).expect(400);
});

it('returns a 400 with an invalid mail or password', async () => {
  await request(app)
    .put(nameSignupRouteV1)
    .send({
      email: 'asdadsad',
      password: 'password',
    })
    .expect(400);

  await request(app)
    .put(nameSignupRouteV1)
    .send({
      email: 'test@test.com',
      password: 'p',
    })
    .expect(400);
});

it('returns a 201 on successful signup', async () => {
  return request(app)
    .put(nameSignupRouteV1)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .put(nameSignupRouteV1)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .put(nameSignupRouteV1)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .put(nameSignupRouteV1)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
