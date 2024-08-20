import { DeleteTransactionModel } from "../../models/TransactionModel"
import { TransactionRepository } from "../../repositories/TransactionRepository"

const repository = new TransactionRepository()
export class DeleteTransactionService implements DeleteTransactionModel {
  async delete(id: string, user_id: string): Promise<void> {
    await repository.deleteOne(id, user_id)
  }
}
