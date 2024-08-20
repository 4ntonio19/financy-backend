import { TransactionRequestBody } from "../../entities/transaction"
import { CreateTransactionModel } from "../../models/TransactionModel"
import { TransactionRepository } from "../../repositories/TransactionRepository"
const repository = new TransactionRepository()

export class CreateTransactionService implements CreateTransactionModel {
  async create(dto: TransactionRequestBody): Promise<string> {
    const transactionCreated = await repository.postOne(dto)
    return transactionCreated.id
  }
}
