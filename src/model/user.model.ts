import { Model, ModelObject } from 'objection';

export class User extends Model {
  id!: string;
  name!: string;
  author!: string;

  static tableName = 'user'; // database table name
  static idColumn = 'id'; // id column name
}

export type UserShape = ModelObject<User>;
