import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Address } from "./entities/Address";

const datasource = new DataSource({
  type: "postgres",
  host: "db", // docker service name
  port: 5432,
  database: "postgres",
  entities: [User, Address],
  logging: true,
  synchronize: true,
  username: "postgres",
  password: "mysecretpassword", // test password
});

export default datasource;
