import { Router } from "express";
import SessionController from "../controllers/SessionController";
const sessionController = new SessionController();
const sessionRouter = Router();

sessionRouter.post("/auth/session", (req, res) =>
  sessionController.createSession(req, res)
);

export default sessionRouter;
