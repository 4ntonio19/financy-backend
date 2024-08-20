import { ListTransactionsModel } from "../../models/TransactionModel";
import { TransactionRepository } from "../../repositories/TransactionRepository";
const repository = new TransactionRepository()
export class ListTransactionListService implements ListTransactionsModel {
    async findMany (user_id: string,
        startDate: Date,
        endDate: Date) {
        // const newStart = new Date( Date.now())
        // const newEnd = new Date( Date.now())
        // newEnd.setMonth(newStart.getMonth() - 7)
        // console.log(newStart, newEnd);
    
        const transactions = await repository.getAll(user_id, startDate, endDate)
    
        return transactions
      }
}