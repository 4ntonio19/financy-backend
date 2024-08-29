import { Request, Response } from "express"
import { HandleError } from "../utils/handleError"
import { ListTransactionListService } from "../services/transactions/ListTransactionsService"
import { ListTransactionService } from "../services/transactions/ListTransactionService"
import { CreateTransactionService } from "../services/transactions/CreateTransactionService"
import { DeleteTransactionService } from "../services/transactions/DeleteTransactionService"

export class TransactionController {
  async list(req: Request, res: Response) {
    const service = new ListTransactionListService()
    try {
      const { userId } = req.params
      const { startDate, endDate } = req.query
      if (!startDate || !endDate)
        throw new HandleError(400, "O período não foi informado.")
      const transactions = await service.findMany(
        userId,
        new Date(startDate?.toString()),
        new Date(endDate.toString())
      )
      res.status(200).json(transactions)
    } catch (error) {
      if (error instanceof HandleError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res
          .status(500)
          .json({ message: "Ocorreu um erro ao buscar as transações." })
      }
    }
  }

  async listOne(req: Request, res: Response) {
    const service = new ListTransactionService()
    try {
      const { id } = req.params
      const { user_id } = req.query
      if (!id || !user_id)
        throw new HandleError(403, "O id da transação não informado.")
      const transaction = await service.findOne(
        id?.toString(),
        user_id?.toString()
      )
      res.status(200).json(transaction)
    } catch (error) {
      console.log(error)
      if (error instanceof HandleError) {
        res.status(error.statusCode).json({ message: error.message })
      } else {
        res
          .status(500)
          .json({ message: "Ocorreu um erro ao busca a transações." })
      }
    }
  }

  async create(req: Request, res: Response) {
    const service = new CreateTransactionService()
    try {
      const userToPost = req.body
      const transaction_id = await service.create(userToPost)
      res.status(201).json({ id: transaction_id })
    } catch (error) {
      console.log(error)

      res.status(500).json({ message: "Ocorreu um erro ao criar a transação." })
    }
  }

  async delete(req: Request, res: Response) {
    const service = new DeleteTransactionService()
    try {
      const { id } = req.params
      const { user_id } = req.query
      if (!id || !user_id)
        throw new HandleError(403, "O id da transação não informado.")
      await service.delete(id, user_id.toString())
      res.status(200).json(null)
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao deletar a transação." })
    }
  }
}
