import { Optional } from 'sequelize';
/**
 * @author Chad Koslovsky
 * @email Chad@technomancy.it
 * @create date 2021-05-25 00:12:45
 * @modify date 2021-05-29 05:05:22
 * @desc [ Plugin sqlite3 model. This extends the Plugin Table into a functional class throughout the application. Just include this file within a script and it will let you know all functionality you have via the database with this table.
 *        You will see the @Table class has all your Column info inside of it. You can set Hooks and Prototypes on the Acutal Plugin Class or Plugin Instance you pull. The model will always be attached to sequalize.models.
 *        Remeber Database functionality MUST happen in backend process only. ]
 * @return {Model Instance} This return the Plugin Instance. You may Create/Delete/Update/Find Plugins from sqlite3.
 */

import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  BelongsTo,
  Unique,
  Default,
} from 'sequelize-typescript';

// Plugin functions

interface PluginAttributes {
  id: number;
  name: string;
  ipcId?: string;
  enabled: boolean;
  firstRun?: boolean;
  registered?: boolean;
}

interface PluginCreationAttributes extends Optional<PluginAttributes, 'id'> {}

@Table({ timestamps: true })
export default class Plugin extends Model<
  PluginAttributes,
  PluginCreationAttributes
> {
  //Columns
  @AllowNull(false)
  @Unique(true)
  @Column({ type: DataType.STRING })
  name!: string;
  @Unique(true)
  @Column({ type: DataType.STRING })
  ipcId!: string;
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  enabled!: boolean;
  @AllowNull(false)
  @Default(true)
  @Column({ type: DataType.BOOLEAN })
  firstRun!: boolean;
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  registered!: boolean;

  //Relationships
}
