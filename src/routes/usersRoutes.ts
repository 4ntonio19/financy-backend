import { Router } from "express";
import UserController from "../controllers/UserController";
import authorization from "../middlewares/authorization";
const usersRouter = Router();
const userController = new UserController();
usersRouter.get("/users", authorization, (req, res) =>
  userController.findAll(req, res)
);
usersRouter.get("/users/:id", authorization, (req, res) =>
  userController.findById(req, res)
);
usersRouter.post("/users", (req, res) => userController.createOne(req, res));

usersRouter.put("/users/:id", authorization, (req, res) =>
  userController.updateOne(req, res)
);
usersRouter.delete("/users/:id", authorization, (req, res) =>
  userController.removeOne(req, res)
);

export default usersRouter;
