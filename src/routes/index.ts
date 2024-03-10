import express from "express";
import usersRouter from "./usersRoutes";
import categoriesRouter from "./categoriesRoutes";
import transactionRouter from "./transactionsRoutes";
import sessionRouter from "./SessionRoutes";

const routes = (app: express.Application) => {
  app.use(
    express.json(),
    usersRouter,
    categoriesRouter,
    transactionRouter,
    sessionRouter
  );
};

export default routes;
