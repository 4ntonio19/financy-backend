import { Request, Response, Router } from "express";
import { TransactionController } from "../controllers/transaction";

const transactionRouter = Router()

const controller = new TransactionController()

transactionRouter.get('/transactions/:user_Id', (req: Request, res: Response) => {
    controller.list(req, res)
})

transactionRouter.get('/transaction/:id', (req: Request, res: Response) => {
    controller.listOne(req, res)
})

transactionRouter.post('/transactions', (req: Request, res: Response) => {
    controller.create(req, res)
})

transactionRouter.delete('/transactions/:id', (req: Request, res: Response) => {
    controller.delete(req, res)
})

export default transactionRouter