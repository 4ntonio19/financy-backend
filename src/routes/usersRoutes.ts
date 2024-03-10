import { Router } from "express";
import UserController from "../controllers/UserController";
import authorization from "../middlewares/authorization";
const usersRouter = Router();
const userController = new UserController();
usersRouter.get("/usuarios", authorization, (req, res) =>
  userController.findAll(req, res)
);
usersRouter.get("/usuarios/:id", authorization, (req, res) =>
  userController.findById(req, res)
);
usersRouter.post("/usuarios", authorization, (req, res) =>
  userController.createOne(req, res)
);
usersRouter.put("/usuarios/:id", authorization, (req, res) =>
  userController.updateOne(req, res)
);
usersRouter.delete("/usuarios/:id", authorization, (req, res) =>
  userController.removeOne(req, res)
);

export default usersRouter;
