import { Optional } from 'sequelize';
/**
 * @author Chad Koslovsky
 * @email Chad@technomancy.it
 * @create date 2021-05-25 00:12:45
 * @modify date 2021-05-29 05:05:22
 * @desc [ Setting sqlite3 model. This extends the Setting Table into a functional class throughout the application. Just include this file within a script and it will let you know all functionality you have via the database with this table.
 *        You will see the @Table class has all your Column info inside of it. You can set Hooks and Prototypes on the Acutal Setting Class or Setting Instance you pull. The model will always be attached to sequalize.models.
 *        Remeber Database functionality MUST happen in backend process only. ]
 * @return {Model Instance} This return the Setting Instance. You may Create/Delete/Update/Find Settings from sqlite3.
 */

import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  BelongsTo,
  Unique,
} from 'sequelize-typescript';

// Setting functions

interface SettingAttributes {
  id: number;
  type: 'application' | 'plugin';
  name: string;
  values: any;
}

interface SettingCreationAttributes extends Optional<SettingAttributes, 'id'> {}

@Table({ timestamps: true })
export default class Setting extends Model<
  SettingAttributes,
  SettingCreationAttributes
> {
  //Columns
  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  type!: 'application' | 'plugin';
  @AllowNull(false)
  @Unique(true)
  @Column({ type: DataType.JSONB })
  name!: string;
  @AllowNull(false)
  @Column({ type: DataType.JSONB })
  values!: string;

  //Relationships
}
