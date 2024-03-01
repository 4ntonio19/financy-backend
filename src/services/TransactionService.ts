import { AppDataSource } from "../database/data-source";
import Transaction from "../models/Transaction";
import ITransaction from "../types/Transaction";

const transactionRepository = AppDataSource.getRepository(Transaction);
class TransactionService {
  async getTransactions(): Promise<ITransaction[]> {
    const listTransactions = transactionRepository.find({
      relations: { user_id: true, categories_id: true },
    });
    if (!listTransactions) throw new Error();
    return listTransactions;
  }

  async postTransaction(transaction: ITransaction): Promise<ITransaction> {
    if (!transaction.user_id || !transaction.categories_id) throw new Error();
    transaction.createdAt = new Date();
    return await transactionRepository.save(transaction);
  }
}

export default TransactionService;
