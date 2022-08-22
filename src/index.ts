require('dotenv').config();
import { Model } from 'objection';
import { app } from './app';
import { db } from './database/db.config';
import { DatabaseConnectionError } from './errors/database-connection-error';

const start = async () => {
  try {
    await db.migrate.latest();
    await db.seed.run();
  } catch (error) {
    throw new DatabaseConnectionError();
  }
  // Connect database to Objection
  Model.knex(db);

  app.listen(process.env.PORT, () => {
    console.log(
      `*:${process.env.PORT} - Listening on port ${process.env.PORT}`
    );
  });
};

start();
