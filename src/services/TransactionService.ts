import { AppDataSource } from "../database/data-source";
import Transaction from "../models/Transaction";
import ITransaction from "../types/Transaction";

const repository = AppDataSource.getRepository(Transaction);
class TransactionService {
  async getTransactions(): Promise<ITransaction[]> {
    const listTransactions = repository.find();
    if (!listTransactions) throw new Error();
    return listTransactions;
  }

  async getTransactionsByUserId(id: number) {
    const listTransactions = repository.find({
      where: {
        user_id: {
          id: id,
        },
      },
    });
    if (!listTransactions) throw new Error();
    return listTransactions;
  }

  async postTransaction(transaction: ITransaction): Promise<ITransaction> {
    if (!transaction.user_id || !transaction.categories_id) throw new Error();
    transaction.createdAt = new Date();
    return await repository.save(transaction);
  }
}

export default TransactionService;
