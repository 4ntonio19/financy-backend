"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTransactionService = void 0;
const TransactionRepository_1 = require("../../repositories/TransactionRepository");
const handleError_1 = require("../../utils/handleError");
const repository = new TransactionRepository_1.TransactionRepository();
class ListTransactionService {
    async findOne(id, user_id) {
        const transaction = await repository.getOneById(id, user_id);
        if (!transaction)
            throw new handleError_1.HandleError(404, "Essa transação não existe.");
        return transaction;
    }
}
exports.ListTransactionService = ListTransactionService;
