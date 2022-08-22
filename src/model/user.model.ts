import { Model, ModelObject, QueryContext, ModelOptions } from 'objection';
import { Password } from '../services/password';

export class User extends Model {
  id!: string;
  userName!: string;
  password!: string;

  static tableName = 'user'; // database table name
  static idColumn = 'id'; // id column name

  async $beforeInsert() {
    this.password = await Password.toHash(this.password);
  }
}

export type UserShape = ModelObject<User>;
