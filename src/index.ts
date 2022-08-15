require('dotenv').config();
import Knex from 'knex';
import { app } from './app';

if (!process.env.DATABASE_PORT) {
  throw new Error(' variable is not defined');
}

const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    port: Number.parseInt(process.env.DATABASE_PORT),
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USERNAME,
  },
});

app.listen(process.env.PORT, () => {
  console.log(`*:${process.env.PORT} - Listening on port ${process.env.PORT}`);
});
