"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTransactionListService = void 0;
const TransactionRepository_1 = require("../../repositories/TransactionRepository");
const repository = new TransactionRepository_1.TransactionRepository();
class ListTransactionListService {
    async findMany(user_id, startDate, endDate) {
        // const newStart = new Date( Date.now())
        // const newEnd = new Date( Date.now())
        // newEnd.setMonth(newStart.getMonth() - 7)
        // console.log(newStart, newEnd);
        const transactions = await repository.getAll(user_id, startDate, endDate);
        return transactions;
    }
}
exports.ListTransactionListService = ListTransactionListService;
