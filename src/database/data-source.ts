import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "../entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "Toinzera",
  password: "8191",
  database: "financecontroldb",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
