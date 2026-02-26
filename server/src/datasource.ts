import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Address } from "./entities/Address";

const datasource = new DataSource({
  type: "better-sqlite3",
  database: "./db.sqlite",
  entities: [User, Address],
  logging: true,
  synchronize: true,
});

export default datasource;
