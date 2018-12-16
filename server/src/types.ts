import { DataTypeUUID } from "sequelize";

export interface User {
  id: DataTypeUUID;
  name: String;
  password: String;
  motto: String;
}