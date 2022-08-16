import config from '../../knexfile';
import Knex from 'knex';

const knex = Knex(config[`${process.env.NODE_ENV}`]);

export { knex as db };
