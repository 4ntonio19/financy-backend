import express from "express";
import usersRouter from "./usersRoutes";

const routes = (app: express.Application) => {
  app.use(express.json(), usersRouter);
};

export default routes;
