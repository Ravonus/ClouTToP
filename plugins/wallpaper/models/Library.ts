/**
 * @author Chad Koslovsky
 * @email Chad@technomancy.it
 * @create date 2021-05-25 00:12:45
 * @modify date 2021-05-29 05:05:22
 * @desc [ Library postgres model. This extends the Library Table into a functional class throughout the application. Just include this file within a script and it will let you know all functionality you have via the database with this table.
 *        You will see the @Table class has all your Column info inside of it. You can set Hooks and Prototypes on the Acutal Library Class or Library Instance you pull. The model will always be attached to sequalize.models.
 *        If imported directly from this file Typing will work and let you know the database columns that are accepted. ]
 * @return {Model Instance} This return the Library Instance. You may Create/Delete/Update/Find Librarys from postgress.
 */

import { Optional } from 'sequelize';

import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';

// Library functions

export interface LibraryAttributes {
  id: number;
  type: 'html5' | 'video' | 'picture';
  extra?: Object;
  path: string;
  title: string;
  description: string;
}

interface LibraryCreationAttributes extends Optional<LibraryAttributes, 'id'> {}

@Table({ timestamps: true })
export default class Library extends Model<
  LibraryAttributes,
  LibraryCreationAttributes
> {
  //Columns
  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  type!: 'html5' | 'video' | 'picture';
  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  path!: string;
  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  description!: string;
  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  title!: string;

  @AllowNull(true)
  @Column({ type: DataType.JSONB })
  extra!: Object;

  //Relationships
}
