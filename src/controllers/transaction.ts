import { Request, Response } from "express"
import { HandleError } from "../utils/handleError"
import { TransactionService } from "../services/transaction"
import { log } from "util"

const service = new TransactionService()
export class TransactionController {
  async list(req: Request, res: Response) {
    try {
      const { userId } = req.params
      const { startDate, endDate } = req.query
      if (!startDate || !endDate)
        throw new HandleError(400, "O período não foi informado.")
      const transactions = await service.getAll(
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
    try {
      const { id } = req.params
      const { user_id } = req.query
      if (!id || !user_id)
        throw new HandleError(403, "O id da transação não informado.")
      const transaction = await service.getOneById(
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
    try {
      const userToPost = req.body
      const transaction_id = await service.postOne(userToPost)
      res.status(201).json({ id: transaction_id })
    } catch (error) {
      console.log(error)

      res.status(500).json({ message: "Ocorreu um erro ao criar a transação." })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { user_id } = req.query
      if (!id || !user_id)
        throw new HandleError(403, "O id da transação não informado.")
      await service.deleteOne(id, user_id.toString())
      res.status(200).json(null)
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao deletar a transação." })
    }
  }
}
