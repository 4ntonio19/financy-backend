import { Router } from "express";
import UserController from "../controllers/UserController";

const usersRouter = Router();
const userController = new UserController();
usersRouter.get("/usuarios", (req, res) => userController.findAll(req, res));
usersRouter.get("/usuarios/:id", (req, res) =>
  userController.findById(req, res)
);
usersRouter.post("/usuarios", (req, res) => userController.createOne(req, res));
usersRouter.put("/usuarios/:id", (req, res) =>
  userController.updateOne(req, res)
);
usersRouter.delete("/usuarios/:id", (req, res) =>
  userController.removeOne(req, res)
);

export default usersRouter;
