"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTransactionService = void 0;
const TransactionRepository_1 = require("../../repositories/TransactionRepository");
const repository = new TransactionRepository_1.TransactionRepository();
class DeleteTransactionService {
    async delete(id, user_id) {
        await repository.deleteOne(id, user_id);
    }
}
exports.DeleteTransactionService = DeleteTransactionService;
