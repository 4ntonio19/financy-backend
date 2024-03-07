import { Router } from "express";
import TransactionController from "../controllers/TransactionController";

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.get("/transactions", (req, res) =>
  transactionController.findAll(req, res)
);
transactionRouter.get("/:id/transactions", (req, res) =>
  transactionController.findByUserId(req, res)
);
transactionRouter.post("/transactions", (req, res) =>
  transactionController.createOne(req, res)
);

export default transactionRouter;
