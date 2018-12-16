import { Table,
         Column,
         Model,
         PrimaryKey,
         Length,
         DataType,
         AutoIncrement,
         AllowNull} from 'sequelize-typescript'

@Table
export class Account extends Model<Account> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Length({min: 3, max: 10})
  @Column
  name: String;

  @Length({min: 6, max: 10})
  @Column
  password: String;

  @AllowNull
  @Column(DataType.TEXT)
  motto: String;
}
