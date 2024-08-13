import { Request, Response } from "express";
import { HandleError } from "../utils/handleError";
import { TransactionService } from "../services/transaction";

const service = new TransactionService()
export class TransactionController {
    async list(req: Request, res: Response) {
        try {
            const { userId } = req.params
            const {startDate, endDate } = req.query
            if(!startDate || !endDate) throw new HandleError(400, "O período não foi informado.")
            const transactions = await service.getAll(userId, new Date(startDate?.toString()), new Date(endDate.toString()) )
            res.status(200).json(transactions)
        } catch (error) {
            if(error instanceof HandleError){
                res.status(error.statusCode).json({ message: error.message })
            }else{
                res.status(500).json({ message: "Ocorreu um erro ao buscar as transações."})
            }
        }
    }
}