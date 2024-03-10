import { Router } from "express";
import TransactionController from "../controllers/TransactionController";
import authorization from "../middlewares/authorization";

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.get("/transactions", authorization, (req, res) =>
  transactionController.findAll(req, res)
);
transactionRouter.get("/:id/transactions", authorization, (req, res) =>
  transactionController.findByUserId(req, res)
);
transactionRouter.post("/transactions", authorization, (req, res) =>
  transactionController.createOne(req, res)
);

export default transactionRouter;
