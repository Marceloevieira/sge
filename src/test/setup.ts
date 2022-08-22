import { Model } from 'objection';
import request from 'supertest';
import config from '../../knexfile';
import { app } from '../app';
import { db } from '../database/db.config';
import fs from 'fs-extra';

declare global {
  var signin: () => Promise<string[]>;
}

beforeAll(async () => {
  process.env.JWT_KEY = 'asdasdasd';
  Model.knex(db);
});

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
  //@ts-ignore
  await fs.remove(config[`${process.env.NODE_ENV}`].connection.filename);
});

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
};
