import { Model, Transaction, transaction } from 'objection';
import request from 'supertest';
import config from '../../knexfile';
import { app } from '../app';
import { db } from '../database/db.config';
import fs from 'fs-extra';

declare global {
  var signin: () => Promise<string[]>;
  var txn: Transaction;
}

beforeAll(async () => {
  process.env.JWT_KEY = 'asdasdasd';
  await db.migrate.latest();
  await db.seed.run();
});

beforeEach(async () => {
  global.txn = await transaction.start(db);
  Model.knex(global.txn);
});

afterEach(async () => {
  await global.txn.rollback();
});

afterAll(async () => {
  await db.destroy();
});

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .put('/v1/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
};
