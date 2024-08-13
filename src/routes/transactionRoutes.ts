import { Request, Response, Router } from "express";
import { TransactionController } from "../controllers/transaction";

const transactionRouter = Router()

const controller = new TransactionController()

transactionRouter.get('/transactions', (req: Request, res: Response) => {
    controller.list(req, res)
})

export default transactionRouter