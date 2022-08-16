require('dotenv').config();
import { Model } from 'objection';
import { app } from './app';
import { db } from './database/db.config';

// Connect database to Objection
Model.knex(db);

app.listen(process.env.PORT, () => {
  console.log(`*:${process.env.PORT} - Listening on port ${process.env.PORT}`);
});
