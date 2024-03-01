import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "../models/User";
import Category from "../models/Category";
import Transaction from "../models/Transaction";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PWD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Category, Transaction],
  migrations: [],
  subscribers: [],
});
